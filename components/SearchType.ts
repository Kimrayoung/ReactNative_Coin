export interface Search {
  currencies: Currency[];
  icos: Ico[];
  exchanges: Exchange[];
  people: Person[];
  tags: Tag[];
}

export interface Currency {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export interface Exchange {
  id: string;
  name: string;
  rank: number;
}

export interface Ico {
  id: string;
  name: string;
  symbol: string;
  is_new: boolean;
}

export interface Person {
  id: string;
  name: string;
  teams_count: number;
}

export interface Tag {
  id: string;
  name: string;
  coin_counter: number;
  ico_counter: number;
}
