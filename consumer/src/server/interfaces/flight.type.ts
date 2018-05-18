export interface ISearchInput {
  from: string;
  to: string;
  fromDate: string;
  toDate: string;
}

export interface ISearchResult {
    departureTime: number;
    price: number;
    distance: number;
    fly_duration: string;
    airline: string;
}

export interface ISearchResults {
  results: ISearchResult[];
}
