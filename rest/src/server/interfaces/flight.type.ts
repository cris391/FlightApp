export interface ISearchInput {
  from: string;
  to: string;
  fromDate: string;
  toDate: string;
}
export interface ISearchInputWithPrice {
  from: string;
  to: string;
  fromDate: string;
  toDate: string;
  fromPrice: string;
  toPrice: string;
}

export interface ISearchResult {
    departureTime: string;
    price: string;
    distance: string;
    fly_duration: string;
    airline: string;
    deep_link: string;
}

export interface ISearchResults {
  results: ISearchResult[];
}
