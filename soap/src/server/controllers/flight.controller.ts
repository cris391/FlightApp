import { SoapService, SoapOperation } from 'soap-decorators';
import * as request from 'request-promise';

import { SearchInput, SearchResults, SearchResult } from '../models/flight.model';
import { FlightService } from '../services/flight.service';
import { ISearchResults, ISearchResult } from '../interfaces/flight.type';

@SoapService({
  portName: 'FlightPort',
  serviceName: 'FlightService'
})
export class FlightController {

  @SoapOperation(SearchResults)
  public search(data: SearchInput, callback: (res) => ISearchResults) {

    const flightService = new FlightService();

    flightService.getResults(data).then((result) => {

      callback(result);

    });

  }

}
