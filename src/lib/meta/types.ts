export interface MetaCampaignInsight {
  campaign_id: string;
  campaign_name: string;
  spend: string;
  impressions: string;
  reach: string;
  clicks: string;
  inline_link_clicks: string;
  ctr: string;
  cpc: string;
  cpm: string;
  date_start: string;
  date_stop: string;
  actions?: Array<{ action_type: string; value: string }>;
}

export interface MetaPost {
  id: string;
  message?: string;
  permalink_url?: string;
  created_time: string;
  type?: string;
  full_picture?: string;
}
