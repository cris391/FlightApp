import * as request from 'request-promise';
import { injectable } from 'inversify';

import { ISearchResults, ISearchResult, ISearchInput, ISearchInputWithPrice } from '../interfaces/flight.type';

@injectable()
export class FlightService {

  public async getResults({ from, to, fromDate, toDate }: ISearchInput) {

    const url = `https://api.skypicker.com/flights?flyFrom=${from}&to=${to}&dateFrom=${fromDate}&dateTo=${toDate}&partner=picky&partner_market=us&limit=15`;

    const body = await request(url);

    return this.formatResult(body);

  }
  public async getResultsWithPrice({ from, to, fromDate, toDate, fromPrice, toPrice }: ISearchInputWithPrice) {

    const url = `https://api.skypicker.com/flights?flyFrom=${from}&to=${to}&dateFrom=${fromDate}&dateTo=${toDate}&price_from=${fromPrice}&price_to=${toPrice}&partner=picky&partner_market=us&limit=15`;

    const body = await request(url);

    return this.formatResult(body);

  }

  public formatResult(data) {

    const results: Array<ISearchResult> = [];
    const resultObj = JSON.parse(data);

    for (const d of resultObj.data) {

      const finalResult: ISearchResult = {
        departureTime: this.formatDate(d.dTime),
        price: d.price,
        distance: d.distance,
        fly_duration: d.fly_duration,
        airline: d.airlines[0],
        deep_link: d.deep_link
      };
      results.push(finalResult);
    }

    return results;
  }

  public formatDate(unFDate): string {
    const date = new Date(unFDate * 1000);

    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }

}
