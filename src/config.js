// All settings for the ITTAN AI agent. Edit here and restart the server.
export default {
  // CRM login (read-only Viewer account is enough) - the agent reads all designs + stock from here
  CRM_BASE_URL: "https://crm.ittanjeweller.com",
  CRM_EMAIL: "admin@ittanjewellers.com",
  CRM_PASSWORD: "Admin@123",

  // Store WhatsApp number for "Enquire on WhatsApp" buttons (used unless changed in Admin → Settings)
  WHATSAPP_PHONE: "9914905216",

  // CRM API key (permission leads:create) - customer phone numbers are saved as Leads in the CRM.
  // Create it in the CRM under Settings -> Integrations. Empty = leads stay only in this agent.
  CRM_LEAD_API_KEY: "crm_live_M8eaVBZhSPee2KAjQznBmF8z3hbLwn2E",

  // CRM website-feed key (the CRM's CATALOG_API_SECRET). When set, the agent reads the product list from the
  // CRM's website feed: only designs ticked 'Website' in the CRM, with price/stock/discount. Empty = old login method.
  CRM_CATALOG_API_KEY: "931c2d31ad19d57d8516cb2cb066c35cc50d054bf9f2affd",

  // Password for the admin panel (/admin). Empty = no login.
  ADMIN_PASSWORD: "Fateh@3288",

  // Claude API key (starts with sk-ant-api03-). Empty = free basic mode.
  ANTHROPIC_API_KEY: "",

  // Find similar designs from a customer's photo (needs ~1 GB RAM). Set false to turn off.
  PHOTO_SEARCH: true,

  // Free mode understands questions by meaning, not just matching words (small ~25 MB model). Set false to turn off.
  SMART_ANSWERS: true,

  // Product search by meaning (vector database) instead of only keywords. Set false to use keyword search.
  VECTOR_SEARCH: true,

  // Folder for saved data (training, chats, leads, products, photo model).
  // Empty = automatic: project data/ folder on Windows, ~/ittan-agent-data on a server.
  DATA_DIR: "",

  // Port the server listens on (hosting panels may override this automatically).
  PORT: 3000,
};
