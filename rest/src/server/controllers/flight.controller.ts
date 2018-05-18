import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from 'inversify-express-utils';
import { Request } from 'express';
import { inject } from 'inversify';

import { FlightService } from '../services/flight.service';
import { ISearchInput, ISearchInputWithPrice } from '../interfaces/flight.type';

@controller('/flight')
export class FlightController {

  constructor(
    @inject('FlightService') private flightService: FlightService
  ) { }

  @httpGet('/')
  public async search(request: Request) {

    const data: ISearchInput = request.query;
    return await this.flightService.getResults(data);

  }
  @httpGet('/price')
  public async searchPrice(request: Request) {

    const data: ISearchInputWithPrice = request.query;

    return await this.flightService.getResultsWithPrice(data);

  }

}
