"""
GTM + GA4 — Migração para tracking code-first (Analytics.tsx)

O que faz:
  1. DESATIVA tags antigas redundantes (Section Observer HTML, Time on Page HTML,
     GA4 Scroll Depth, GA4 Section View, GA4 Time on Page, GA4 WhatsApp Click)
     → mantém Meta Pixel + Clarity intactos
  2. CRIA DataLayer Variables para todos os novos parâmetros
  3. CRIA Trigger "Custom Events — Analytics Scala" (regex cobrindo todos os novos eventos)
  4. CRIA GA4 Event Tag universal (event_name = {{Event}}, todos os parâmetros mapeados)
  5. PUBLICA nova versão do container
  6. REGISTRA Custom Dimensions no GA4 para todos os parâmetros novos

NOTA: O trigger [5] WhatsApp Button Click (linkClick) é MANTIDO — ele dispara
  o Meta Pixel Lead. A GA4 WhatsApp Click (tag [6]) é desativada pois nosso
  onClick já envia via dataLayer.
"""
import sys, os
sys.stdout.reconfigure(encoding="utf-8")

from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
import googleapiclient.discovery

SCOPES = [
    "https://www.googleapis.com/auth/tagmanager.edit.containers",
    "https://www.googleapis.com/auth/tagmanager.edit.containerversions",
    "https://www.googleapis.com/auth/tagmanager.publish",
    "https://www.googleapis.com/auth/analytics.edit",
]

TOKEN_FILE  = os.path.join(os.path.dirname(__file__), "setup_token.json")
CLIENT_CONFIG = {
    "installed": {
        "client_id":     os.environ.get("GOOGLE_CLIENT_ID", ""),
        "client_secret": os.environ.get("GOOGLE_CLIENT_SECRET", ""),
        "auth_uri":      "https://accounts.google.com/o/oauth2/auth",
        "token_uri":     "https://oauth2.googleapis.com/token",
        "redirect_uris": ["http://localhost"],
    }
}

# ── Auth ──────────────────────────────────────────────────────────────────────
credentials = None
if os.path.exists(TOKEN_FILE):
    credentials = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
if not credentials or not credentials.valid:
    if credentials and credentials.expired and credentials.refresh_token:
        credentials.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_config(CLIENT_CONFIG, SCOPES)
        credentials = flow.run_local_server(port=8080, open_browser=True)
    with open(TOKEN_FILE, "w") as f:
        f.write(credentials.to_json())
print("Autenticado!\n")

gtm = googleapiclient.discovery.build("tagmanager", "v2", credentials=credentials)
ga4 = googleapiclient.discovery.build("analyticsadmin", "v1beta", credentials=credentials)

# ── Localizar container GTM-TH5VGFDP ─────────────────────────────────────────
print("=" * 60)
print("GTM — Localizando container GTM-TH5VGFDP")
print("=" * 60)
container_path = None
account_id = None
container_id = None
for acc in gtm.accounts().list().execute().get("account", []):
    for c in gtm.accounts().containers().list(parent=acc["path"]).execute().get("container", []):
        if c.get("publicId") == "GTM-TH5VGFDP":
            container_path = c["path"]
            account_id = acc["accountId"]
            container_id = c["containerId"]
            print(f"  Encontrado: {c['name']} ({c['publicId']})")
if not container_path:
    print("ERRO: container nao encontrado"); sys.exit(1)

workspaces = gtm.accounts().containers().workspaces().list(parent=container_path).execute()
ws = workspaces["workspace"][0]
ws_path = ws["path"]
print(f"  Workspace: {ws['name']}")

# ── Carregar estado atual ─────────────────────────────────────────────────────
all_tags = {t["name"]: t for t in
    gtm.accounts().containers().workspaces().tags().list(parent=ws_path).execute().get("tag", [])}
all_triggers = {t["name"]: t for t in
    gtm.accounts().containers().workspaces().triggers().list(parent=ws_path).execute().get("trigger", [])}
all_vars = {v["name"]: v for v in
    gtm.accounts().containers().workspaces().variables().list(parent=ws_path).execute().get("variable", [])}

print(f"  Tags: {list(all_tags.keys())}")
print(f"  Triggers: {list(all_triggers.keys())}")
print(f"  Variables: {list(all_vars.keys())}")

# ── Obter measurement ID do GA4 Configuration tag ─────────────────────────────
GA4_MEASUREMENT_ID = ""
ga4_config = all_tags.get("GA4 — Configuration") or all_tags.get("GA4 Configuration")
if ga4_config:
    for p in ga4_config.get("parameter", []):
        if p.get("key") == "tagId":
            GA4_MEASUREMENT_ID = p["value"]
            break
if not GA4_MEASUREMENT_ID:
    print("ERRO: GA4 Configuration tag nao encontrado ou sem tagId"); sys.exit(1)
print(f"\n  GA4 Measurement ID: {GA4_MEASUREMENT_ID}")

# ── PASSO 1: Desativar tags antigas redundantes ───────────────────────────────
print("\n" + "=" * 60)
print("PASSO 1 — Desativando tracking antigo (Custom HTML + GA4 events duplicados)")
print("=" * 60)

TAGS_TO_DISABLE = [
    "GA4 — WhatsApp Click",        # será substituído pelo nosso onClick tracking
    "GA4 — Scroll Depth",           # substituído pelo Analytics.tsx
    "Section Observer (Custom HTML)",  # substituído pelo Analytics.tsx
    "GA4 — Section View",           # substituído pelo Analytics.tsx
    "Time on Page Tracker (Custom HTML)",  # substituído pelo Analytics.tsx
    "GA4 — Time on Page",           # substituído pelo Analytics.tsx
]

for tag_name in TAGS_TO_DISABLE:
    tag = all_tags.get(tag_name)
    if not tag:
        print(f"  SKIP (nao encontrado): {tag_name}")
        continue
    if not tag.get("firingTriggerId"):
        print(f"  SKIP (ja desativado): {tag_name}")
        continue
    tag["firingTriggerId"] = []
    gtm.accounts().containers().workspaces().tags().update(
        path=tag["path"], body=tag
    ).execute()
    print(f"  DESATIVADO (sem trigger): {tag_name}")

# ── PASSO 2: Criar DataLayer Variables ────────────────────────────────────────
print("\n" + "=" * 60)
print("PASSO 2 — Criando DataLayer Variables")
print("=" * 60)

DLV_PARAMS = {
    "DLV - location":     "location",
    "DLV - scroll_pct":   "scroll_pct",
    "DLV - percent":      "percent",
    "DLV - section":      "section",
    "DLV - seconds":      "seconds",
    "DLV - label":        "label",
    "DLV - href":         "href",
    "DLV - question":     "question",
    "DLV - seconds_open": "seconds_open",
    "DLV - metric":       "metric",
    "DLV - metric_value": "metric_value",
}

for var_name, dl_key in DLV_PARAMS.items():
    if var_name in all_vars:
        print(f"  SKIP (ja existe): {var_name}")
        continue
    result = gtm.accounts().containers().workspaces().variables().create(
        parent=ws_path,
        body={
            "name": var_name,
            "type": "v",
            "parameter": [
                {"type": "INTEGER",  "key": "dataLayerVersion", "value": "2"},
                {"type": "TEMPLATE", "key": "name",             "value": dl_key},
            ],
        }
    ).execute()
    all_vars[var_name] = result
    print(f"  CRIADA: {var_name} (chave: {dl_key}, ID: {result['variableId']})")

# ── PASSO 3: Criar Trigger Custom Event para nossos eventos ───────────────────
print("\n" + "=" * 60)
print("PASSO 3 — Trigger Custom Events Analytics Scala")
print("=" * 60)

TRIGGER_NAME = "Custom Events — Analytics Scala"
EVENTS = [
    "wa_button_click",
    "cta_click",
    "nav_link_click",
    "time_milestone",
    "scroll_depth_reached",
    "exit_intent",
    "section_viewed",
    "section_time_spent",
    "faq_open",
    "faq_close",
    "web_vitals",
]
events_regex = "^(" + "|".join(EVENTS) + ")$"

analytics_trigger = all_triggers.get(TRIGGER_NAME)
if analytics_trigger:
    print(f"  SKIP (ja existe): {TRIGGER_NAME}")
else:
    analytics_trigger = gtm.accounts().containers().workspaces().triggers().create(
        parent=ws_path,
        body={
            "name": TRIGGER_NAME,
            "type": "CUSTOM_EVENT",
            "customEventFilter": [
                {
                    "type": "MATCH_REGEX",
                    "parameter": [
                        {"type": "TEMPLATE", "key": "arg0", "value": "{{_event}}"},
                        {"type": "TEMPLATE", "key": "arg1", "value": events_regex},
                    ],
                }
            ],
            "parameter": [
                {"type": "BOOLEAN", "key": "useEqualityMatching", "value": "false"},
            ],
        }
    ).execute()
    all_triggers[TRIGGER_NAME] = analytics_trigger
    print(f"  CRIADO: {TRIGGER_NAME} (ID: {analytics_trigger['triggerId']})")
    print(f"  Regex: {events_regex}")

trigger_id = analytics_trigger["triggerId"]

# ── PASSO 4: Criar GA4 Event Tag universal ────────────────────────────────────
print("\n" + "=" * 60)
print("PASSO 4 — GA4 Event Tag universal")
print("=" * 60)

TAG_NAME = "GA4 Event — Analytics Scala (universal)"

# eventSettingsTable: usa chaves "parameter" e "parameterValue" (estrutura real do gaawe)
event_settings = []
for var_name, dl_key in DLV_PARAMS.items():
    var_ref = "{{" + var_name + "}}"
    event_settings.append({
        "type": "map",
        "map": [
            {"type": "template", "key": "parameter",      "value": dl_key},
            {"type": "template", "key": "parameterValue", "value": var_ref},
        ],
    })

tag_body = {
    "name": TAG_NAME,
    "type": "gaawe",
    "parameter": [
        {"type": "template", "key": "measurementIdOverride", "value": GA4_MEASUREMENT_ID},
        {"type": "template", "key": "eventName",             "value": "{{Event}}"},
        {"type": "boolean",  "key": "sendEcommerceData",     "value": "false"},
        {"type": "list",     "key": "eventSettingsTable",    "list": event_settings},
    ],
    "firingTriggerId": [str(trigger_id)],
}

existing = all_tags.get(TAG_NAME)
if existing:
    existing.update({"parameter": tag_body["parameter"], "firingTriggerId": tag_body["firingTriggerId"]})
    gtm.accounts().containers().workspaces().tags().update(
        path=existing["path"], body=existing
    ).execute()
    print(f"  ATUALIZADO: {TAG_NAME}")
else:
    result = gtm.accounts().containers().workspaces().tags().create(
        parent=ws_path, body=tag_body
    ).execute()
    print(f"  CRIADO: {TAG_NAME} (ID: {result['tagId']})")
    print(f"  Measurement ID: {GA4_MEASUREMENT_ID}")
    print(f"  Trigger ID: {trigger_id}")
    print(f"  Eventos cobertos: {', '.join(EVENTS)}")

# ── PASSO 5: Publicar container ───────────────────────────────────────────────
print("\n" + "=" * 60)
print("PASSO 5 — Publicando nova versão GTM")
print("=" * 60)

container_base = f"accounts/{account_id}/containers/{container_id}"
version_resp = gtm.accounts().containers().workspaces().create_version(
    path=ws_path,
    body={
        "name": "Analytics code-first v1",
        "notes": (
            "Migração para tracking via Analytics.tsx:\n"
            "- Desativados: Section Observer HTML, Time on Page HTML, GA4 Scroll Depth/Section/Time/WA\n"
            "- Criados: DLVs para todos os parâmetros + trigger regex + GA4 Event tag universal\n"
            "- Mantidos: Meta Pixel, Clarity, GA4 Configuration, linkClick p/ Meta Pixel Lead"
        )
    }
).execute()

headers = gtm.accounts().containers().version_headers().list(
    parent=container_base
).execute().get("containerVersionHeader", [])
latest_id = headers[0]["containerVersionId"] if headers else version_resp.get("containerVersion", {}).get("containerVersionId")
gtm.accounts().containers().versions().publish(
    path=f"{container_base}/versions/{latest_id}"
).execute()
print(f"  GTM publicado! Versao: {latest_id}")

# ── PASSO 6: GA4 Custom Dimensions ───────────────────────────────────────────
print("\n" + "=" * 60)
print("PASSO 6 — GA4 Custom Dimensions")
print("=" * 60)

PROPERTY = "properties/528936871"
NEW_DIMS = [
    {"displayName": "Location",      "parameterName": "location",      "scope": "EVENT"},
    {"displayName": "Scroll Pct",    "parameterName": "scroll_pct",    "scope": "EVENT"},
    {"displayName": "Percent",       "parameterName": "percent",       "scope": "EVENT"},
    {"displayName": "Section",       "parameterName": "section",       "scope": "EVENT"},
    {"displayName": "Seconds",       "parameterName": "seconds",       "scope": "EVENT"},
    {"displayName": "Label",         "parameterName": "label",         "scope": "EVENT"},
    {"displayName": "Href",          "parameterName": "href",          "scope": "EVENT"},
    {"displayName": "Question",      "parameterName": "question",      "scope": "EVENT"},
    {"displayName": "Seconds Open",  "parameterName": "seconds_open",  "scope": "EVENT"},
    {"displayName": "Metric",        "parameterName": "metric",        "scope": "EVENT"},
    {"displayName": "Metric Value",  "parameterName": "metric_value",  "scope": "EVENT"},
]

existing_ga4 = ga4.properties().customDimensions().list(parent=PROPERTY).execute()
existing_params = {d.get("parameterName") for d in existing_ga4.get("customDimensions", [])}
print(f"  Existentes: {sorted(existing_params)}")

for dim in NEW_DIMS:
    if dim["parameterName"] in existing_params:
        print(f"  SKIP (ja existe): {dim['parameterName']}")
        continue
    result = ga4.properties().customDimensions().create(parent=PROPERTY, body=dim).execute()
    print(f"  CRIADA: {result.get('displayName')} ({result.get('parameterName')})")

# ── Resumo ────────────────────────────────────────────────────────────────────
print("\n" + "=" * 60)
print("CONCLUIDO")
print()
print("Tags DESATIVADAS (Custom HTML / GA4 events antigos):")
for t in TAGS_TO_DISABLE:
    print(f"  - {t}")
print()
print("Tags MANTIDAS (críticas):")
print("  - GA4 — Configuration")
print("  - Meta Pixel — Base Code")
print("  - Meta Pixel — Lead (WhatsApp Click)  ← linkClick trigger [5] mantido")
print("  - Microsoft Clarity")
print()
print("NOVO tracking via Analytics.tsx → dataLayer → GTM → GA4:")
for e in EVENTS:
    print(f"  {e}")
print()
print("GA4 Custom Dimensions registradas:")
for d in NEW_DIMS:
    print(f"  {d['parameterName']}")
print("=" * 60)
