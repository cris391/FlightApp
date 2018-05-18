import { XSDComplexType, XSDElement } from 'soap-decorators';

import { ISearchInput, ISearchResult, ISearchResults } from '../interfaces/flight.type';

@XSDComplexType
export class SearchInput implements ISearchInput {

  @XSDElement
  from: string;

  @XSDElement
  to: string;

  @XSDElement
  fromDate: string;

  @XSDElement
  toDate: string;

}

@XSDComplexType
export class SearchResult implements ISearchResult {

  @XSDElement
  departureTime: string;

  @XSDElement
  price: string;

  @XSDElement
  distance: string;

  @XSDElement
  fly_duration: string;

  @XSDElement
  airline: string;

  @XSDElement
  deep_link: string

}

@XSDComplexType
export class SearchResults implements ISearchResults {

  @XSDElement({
    type: SearchResult
  })
  results: SearchResult[];

}
