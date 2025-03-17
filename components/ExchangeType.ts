export interface Exchange {
  id: string;
  name: string;
  active: boolean;
  website_status: boolean;
  api_status: boolean;
  description: string;
  message: string;
  links: Links;
  markets_data_fetched: boolean;
  adjusted_rank: number;
  reported_rank: number;
  currencies: number;
  markets: number;
  fiats: Fiat[];
  quotes: Quotes;
  last_updated: Date;
}

export interface Fiat {
  name: string;
  symbol: string;
}

export interface Links {
  website: string[];
  twitter: string[];
}

export interface Quotes {
  $KEY: Key;
}

export interface Key {
  reported_volume_24h: number;
  adjusted_volume_24h: number;
  reported_volume_7d: number;
  adjusted_volume_7d: number;
  reported_volume_30d: number;
  adjusted_volume_30d: number;
}
