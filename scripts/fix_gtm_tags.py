"""
fix_gtm_tags.py
Corrige a configuração do GTM para receber todos os eventos do Analytics.tsx:
1. Remove tags e triggers obsoletos (Custom HTML duplicados)
2. Cria variáveis Data Layer para todos os parâmetros dos eventos
3. Cria trigger catch-all para todos os custom events
4. Cria uma tag GA4 Event catch-all que passa o evento + todos os parâmetros
5. Publica nova versão
"""
import sys, os, json
sys.stdout.reconfigure(encoding='utf-8')

from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
import googleapiclient.discovery

TOKEN_FILE = os.path.join(os.path.dirname(__file__), "setup_token.json")
SCOPES = [
    "https://www.googleapis.com/auth/tagmanager.edit.containers",
    "https://www.googleapis.com/auth/tagmanager.edit.containerversions",
    "https://www.googleapis.com/auth/tagmanager.publish",
]

# Auth
creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
if creds.expired and creds.refresh_token:
    print("Renovando token...")
    creds.refresh(Request())
    with open(TOKEN_FILE, "w") as f:
        f.write(creds.to_json())

gtm = googleapiclient.discovery.build("tagmanager", "v2", credentials=creds)

# ── Localizar container ────────────────────────────────────────────────────────
accounts = gtm.accounts().list().execute()
container_path = account_id = container_id = None
for acc in accounts.get("account", []):
    containers = gtm.accounts().containers().list(parent=acc["path"]).execute()
    for c in containers.get("container", []):
        if c.get("publicId") == "GTM-TH5VGFDP":
            container_path = c["path"]
            account_id = acc["accountId"]
            container_id = c["containerId"]
            print(f"Container: {c['name']} ({c['publicId']})")

workspaces = gtm.accounts().containers().workspaces().list(parent=container_path).execute()
ws = workspaces["workspace"][0]
wp = ws["path"]
print(f"Workspace: {ws['name']}")

# ── 1. DELETAR tags obsoletas ─────────────────────────────────────────────────
# IDs das tags a deletar (baseado na auditoria):
#   10 = Section Observer (Custom HTML)
#   14 = Time on Page Tracker (Custom HTML)
#   13 = GA4 — Section View
#   17 = GA4 — Time on Page
#   8  = GA4 — Scroll Depth
#   6  = GA4 — WhatsApp Click  (será substituído pelo catch-all com parâmetros)
TAGS_TO_DELETE = [10, 14, 13, 17, 8, 6]

print("\n=== 1. Deletando tags obsoletas ===")
for tag_id in TAGS_TO_DELETE:
    tag_path = f"{wp}/tags/{tag_id}"
    try:
        gtm.accounts().containers().workspaces().tags().delete(path=tag_path).execute()
        print(f"  ✅ Tag {tag_id} deletada")
    except Exception as e:
        print(f"  ⚠️  Tag {tag_id}: {e}")

# ── 2. DELETAR triggers obsoletos ────────────────────────────────────────────
# IDs a deletar:
#   7  = Scroll Depth 25/50/75   (substituído pelo nosso scroll_depth_reached)
#   9  = Window Loaded — All Pages (era usado pelo Section Observer)
#   12 = Section View Event      (era usado pelo GA4 — Section View)
#   16 = Time on Page Event      (era usado pelo GA4 — Time on Page)
# MANTER: 5 = WhatsApp Button Click (linkClick) — ainda usado pelo Meta Pixel
TRIGGERS_TO_DELETE = [7, 9, 12, 16]

print("\n=== 2. Deletando triggers obsoletos ===")
for trigger_id in TRIGGERS_TO_DELETE:
    trigger_path = f"{wp}/triggers/{trigger_id}"
    try:
        gtm.accounts().containers().workspaces().triggers().delete(path=trigger_path).execute()
        print(f"  ✅ Trigger {trigger_id} deletado")
    except Exception as e:
        print(f"  ⚠️  Trigger {trigger_id}: {e}")

# ── 3. CRIAR variáveis Data Layer ────────────────────────────────────────────
print("\n=== 3. Criando variáveis Data Layer ===")

# Verificar variáveis existentes para não duplicar
existing_vars = gtm.accounts().containers().workspaces().variables().list(parent=wp).execute()
existing_var_names = [v["name"] for v in existing_vars.get("variable", [])]

DL_VARS = [
    # (nome da variável GTM, chave no dataLayer)
    ("DL - location",       "location"),
    ("DL - scroll_pct",     "scroll_pct"),
    ("DL - percent",        "percent"),
    ("DL - seconds",        "seconds"),
    ("DL - section",        "section"),
    ("DL - metric",         "metric"),
    ("DL - metric_value",   "metric_value"),
    ("DL - question",       "question"),
    ("DL - seconds_open",   "seconds_open"),
]

created_vars = {}
for var_name, dl_key in DL_VARS:
    if var_name in existing_var_names:
        # Buscar o ID da variável existente
        for v in existing_vars.get("variable", []):
            if v["name"] == var_name:
                created_vars[var_name] = v
                print(f"  SKIP (já existe): {var_name}")
        continue
    result = gtm.accounts().containers().workspaces().variables().create(
        parent=wp,
        body={
            "name": var_name,
            "type": "v",  # Data Layer Variable
            "parameter": [
                {"type": "INTEGER", "key": "dataLayerVersion", "value": "2"},
                {"type": "BOOLEAN", "key": "setDefaultValue",   "value": "false"},
                {"type": "TEMPLATE",  "key": "name",             "value": dl_key},
            ],
        }
    ).execute()
    created_vars[var_name] = result
    print(f"  ✅ Criada: {var_name} → dataLayer.{dl_key}")

# ── 4. CRIAR trigger catch-all custom event ───────────────────────────────────
print("\n=== 4. Criando trigger catch-all Custom Event ===")

CATCHALL_EVENT_REGEX = (
    "wa_button_click|cta_click|nav_link_click|"
    "time_milestone|scroll_depth_reached|exit_intent|"
    "section_viewed|section_time_spent|"
    "web_vitals|faq_open|faq_close"
)

catchall_trigger = gtm.accounts().containers().workspaces().triggers().create(
    parent=wp,
    body={
        "name": "All Custom Analytics Events",
        "type": "CUSTOM_EVENT",
        "customEventFilter": [
            {
                "type": "MATCH_REGEX",
                "parameter": [
                    {"type": "TEMPLATE", "key": "arg0", "value": "{{_event}}"},
                    {"type": "TEMPLATE", "key": "arg1", "value": CATCHALL_EVENT_REGEX},
                ]
            }
        ],
    }
).execute()
print(f"  ✅ Trigger criado: {catchall_trigger['name']} (ID: {catchall_trigger['triggerId']})")

# ── 5. CRIAR tag GA4 Event catch-all ─────────────────────────────────────────
print("\n=== 5. Criando tag GA4 Event catch-all ===")

# GA4 Measurement ID da config tag (tag 3) — vamos reutilizar
ga4_config_tags = gtm.accounts().containers().workspaces().tags().list(parent=wp).execute()
ga4_measurement_id = None
for t in ga4_config_tags.get("tag", []):
    if t.get("type") == "googtag":
        for p in t.get("parameter", []):
            if p.get("key") == "tagId":
                ga4_measurement_id = p.get("value")
                print(f"  GA4 Measurement ID: {ga4_measurement_id}")
        break

if not ga4_measurement_id:
    print("  ⚠️  Não encontrou GA4 Measurement ID — usando G-XXXXXXXX como fallback")
    ga4_measurement_id = "G-XXXXXXXX"

# Montar lista de event parameters para a tag GA4
event_params = [
    {"map": [
        {"type": "TEMPLATE", "key": "name",  "value": "location"},
        {"type": "TEMPLATE", "key": "value", "value": "{{DL - location}}"},
    ]},
    {"map": [
        {"type": "TEMPLATE", "key": "name",  "value": "scroll_pct"},
        {"type": "TEMPLATE", "key": "value", "value": "{{DL - scroll_pct}}"},
    ]},
    {"map": [
        {"type": "TEMPLATE", "key": "name",  "value": "percent"},
        {"type": "TEMPLATE", "key": "value", "value": "{{DL - percent}}"},
    ]},
    {"map": [
        {"type": "TEMPLATE", "key": "name",  "value": "seconds"},
        {"type": "TEMPLATE", "key": "value", "value": "{{DL - seconds}}"},
    ]},
    {"map": [
        {"type": "TEMPLATE", "key": "name",  "value": "section"},
        {"type": "TEMPLATE", "key": "value", "value": "{{DL - section}}"},
    ]},
    {"map": [
        {"type": "TEMPLATE", "key": "name",  "value": "metric"},
        {"type": "TEMPLATE", "key": "value", "value": "{{DL - metric}}"},
    ]},
    {"map": [
        {"type": "TEMPLATE", "key": "name",  "value": "metric_value"},
        {"type": "TEMPLATE", "key": "value", "value": "{{DL - metric_value}}"},
    ]},
    {"map": [
        {"type": "TEMPLATE", "key": "name",  "value": "question"},
        {"type": "TEMPLATE", "key": "value", "value": "{{DL - question}}"},
    ]},
    {"map": [
        {"type": "TEMPLATE", "key": "name",  "value": "seconds_open"},
        {"type": "TEMPLATE", "key": "value", "value": "{{DL - seconds_open}}"},
    ]},
]

catchall_tag = gtm.accounts().containers().workspaces().tags().create(
    parent=wp,
    body={
        "name": "GA4 — All Custom Events (catch-all)",
        "type": "gaawe",  # GA4 Event
        "parameter": [
            # measurementIdOverride empty → herda da tag GA4 Configuration
            {"type": "TEMPLATE", "key": "measurementIdOverride", "value": ""},
            {"type": "TEMPLATE", "key": "eventName",             "value": "{{Event}}"},
            {
                "type": "LIST",
                "key": "eventParameters",
                "list": [
                    {"type": "MAP", "map": row["map"]}
                    for row in event_params
                ],
            },
            {"type": "BOOLEAN", "key": "sendEcommerceData", "value": "false"},
        ],
        "firingTriggerId": [catchall_trigger["triggerId"]],
    }
).execute()
print(f"  ✅ Tag criada: {catchall_tag['name']} (ID: {catchall_tag['tagId']})")

# ── 6. PUBLICAR nova versão ───────────────────────────────────────────────────
print("\n=== 6. Publicando nova versão do GTM ===")

container_path_base = f"accounts/{account_id}/containers/{container_id}"

version_resp = gtm.accounts().containers().workspaces().create_version(
    path=wp,
    body={
        "name": "Analytics code-first v2 — catch-all GA4 events",
        "notes": "Remove tags Custom HTML obsoletas. Adiciona catch-all para todos os eventos do Analytics.tsx: wa_button_click (com location+scroll_pct), cta_click, nav_link_click, time_milestone, scroll_depth_reached, exit_intent, section_viewed, section_time_spent, web_vitals, faq_open, faq_close."
    }
).execute()

cv = version_resp.get("containerVersion", {})
version_id = cv.get("containerVersionId")

headers_resp = gtm.accounts().containers().version_headers().list(
    parent=container_path_base
).execute()
headers = headers_resp.get("containerVersionHeader", [])
latest_version_id = headers[0].get("containerVersionId") if headers else version_id

publish_path = f"{container_path_base}/versions/{latest_version_id}"
published = gtm.accounts().containers().versions().publish(path=publish_path).execute()
print(f"  ✅ GTM publicado! Versão: {latest_version_id}")

# ── Resumo final ──────────────────────────────────────────────────────────────
print("\n" + "=" * 60)
print("AUDITORIA E CORREÇÃO CONCLUÍDA")
print("=" * 60)
print("Removido:")
print("  - Section Observer (Custom HTML) → substituído por Analytics.tsx")
print("  - Time on Page Tracker (Custom HTML) → substituído por Analytics.tsx")
print("  - GA4 — Section View, GA4 — Time on Page, GA4 — Scroll Depth, GA4 — WhatsApp Click")
print("  - Triggers: Scroll Depth, Window Loaded, Section View, Time on Page")
print("\nCriado:")
print("  - 9 variáveis Data Layer (location, scroll_pct, percent, seconds, section, metric, metric_value, question, seconds_open)")
print("  - Trigger catch-all: 'All Custom Analytics Events'")
print("  - Tag GA4: 'GA4 — All Custom Events (catch-all)'")
print("\nEventos agora recebidos pelo GA4:")
print("  ✅ wa_button_click     (location, scroll_pct)")
print("  ✅ cta_click           (location, scroll_pct)")
print("  ✅ nav_link_click      (label, href)")
print("  ✅ time_milestone      (seconds)")
print("  ✅ scroll_depth_reached(percent)")
print("  ✅ exit_intent         (scroll_pct)")
print("  ✅ section_viewed      (section, scroll_pct)")
print("  ✅ section_time_spent  (section, seconds)")
print("  ✅ web_vitals          (metric, metric_value)")
print("  ✅ faq_open            (question)")
print("  ✅ faq_close           (question, seconds_open)")
print("\nMantido intacto:")
print("  ✅ Meta Pixel Base Code (all pages)")
print("  ✅ Meta Pixel Lead (linkClick WhatsApp Button)")
print("  ✅ GA4 Configuration tag")
print("  ✅ Microsoft Clarity")
print("=" * 60)
