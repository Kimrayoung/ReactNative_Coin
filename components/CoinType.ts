export interface CoinProps {
  id: string;
  name: string;
  rank: number;
  symbol: string;
  isNew: boolean;
}

export interface CoinDetail {
  id: string;
  name: string;
  symbol: string;
  parent: Parent;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: Tag[];
  team: Team[];
  description: string;
  message: string;
  open_source: boolean;
  hardware_wallet: boolean;
  started_at: string;
  development_status: string;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  contract: string;
  platform: string;
  contracts: Contract[];
  links: Links;
  links_extended: LinksExtended[];
  whitepaper: Whitepaper;
  first_data_at: string;
  last_data_at: string;
}

export interface Contract {
  contract: string;
  platform: string;
  type: string;
}

export interface Links {
  explorer: string[];
  facebook: string[];
  reddit: string[];
  source_code: string[];
  website: string[];
  youtube: string[];
  medium: null;
}

export interface LinksExtended {
  url: string;
  type: string;
  stats?: Stats;
}

export interface Stats {
  subscribers?: number;
  contributors?: number;
  stars?: number;
}

export interface Parent {
  id: string;
  name: string;
  symbol: string;
}

export interface Tag {
  id: string;
  name: string;
  coin_counter: number;
  ico_counter: number;
}

export interface Team {
  id: string;
  name: string;
  position: string;
}

export interface Whitepaper {
  link: string;
  thumbnail: string;
}
