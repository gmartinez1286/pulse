/**
 * Meta Graph API client wrapper.
 * Luis implements real API calls in Session 9.
 */

const GRAPH_BASE = "https://graph.facebook.com/v21.0";

export class MetaClient {
  private token: string;

  constructor(token = process.env.META_SYSTEM_USER_TOKEN ?? "") {
    this.token = token;
  }

  async testConnection(): Promise<{ ok: boolean; message: string }> {
    if (!this.token) {
      return { ok: false, message: "META_SYSTEM_USER_TOKEN not configured" };
    }
    // Stub — Luis wires real /me or /act_{id} check
    return { ok: true, message: "Token configured (stub)" };
  }

  async fetchCampaignInsights(
    adAccountId: string,
    since: string,
    until: string
  ): Promise<unknown[]> {
    const url = `${GRAPH_BASE}/act_${adAccountId}/insights?level=campaign&time_range={"since":"${since}","until":"${until}"}&time_increment=1`;
    void url;
    return [];
  }

  async fetchPagePosts(pageId: string): Promise<unknown[]> {
    const url = `${GRAPH_BASE}/${pageId}/posts`;
    void url;
    return [];
  }
}

export const metaClient = new MetaClient();
