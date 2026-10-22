// Sends leads captured by the agent into the CRM (Leads page) through the CRM's
// lead webhook. Needs CRM_LEAD_API_KEY (a CRM API key with the leads:create
// permission) in src/config.js. Leads that could not be sent stay in the local
// list with crmSynced=false and are retried on the next lead and at startup.

import config from './config.js';
import { load, save } from './store.js';

const BASE = () => (config.CRM_BASE_URL || '').replace(/\/$/, '');

export function crmLeadsConfigured() {
  return Boolean(config.CRM_LEAD_API_KEY && BASE());
}

async function send(lead) {
  const res = await fetch(`${BASE()}/api/webhooks/leads`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': config.CRM_LEAD_API_KEY },
    body: JSON.stringify({
      fullName: lead.name || 'Website visitor (AI agent)',
      phoneNumber: lead.phone,
      ...(lead.email ? { email: lead.email } : {}),
      ...(lead.city ? { city: lead.city } : {}),
      // The CRM has no pincode field: it goes in Locality and in the note.
      ...(lead.pincode ? { locality: lead.pincode } : {}),
      source: 'OTHER',
      subSource: 'AI agent',
      externalId: lead.id,
      externalSource: 'ittan-ai-agent',
      notes: `Captured by the website AI agent.\nInterested in: ${lead.interest || '-'}` +
        (lead.email ? `\nEmail: ${lead.email}` : '') +
        (lead.city || lead.pincode ? `\nCity: ${lead.city || '-'}, Pincode: ${lead.pincode || '-'}` : '') +
        (lead.pageUrl ? `\nPage: ${lead.pageUrl}` : ''),
    }),
  });
  if (!res.ok) throw new Error(`CRM said HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
}

/** Push every lead not yet in the CRM. Never throws. */
export async function syncLeadsToCrm() {
  if (!crmLeadsConfigured()) return;
  const leads = load('leads');
  let changed = false;
  for (const lead of leads) {
    if (lead.crmSynced) continue;
    try {
      await send(lead);
      lead.crmSynced = true;
      delete lead.crmError;
    } catch (err) {
      lead.crmError = err.message;
      console.error('[leads] could not send lead to the CRM:', err.message);
    }
    changed = true;
  }
  if (changed) save('leads', leads);
}
