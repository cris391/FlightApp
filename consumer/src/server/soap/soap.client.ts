import { createClientAsync } from 'soap';
import { Request, Response } from 'express';
import { ISearchResults, ISearchInput } from '../interfaces/flight.type';

export let index = async (req: Request, res: Response) => {

  const url = 'http://localhost:5000/soap/flight?wsdl';
  const args: ISearchInput = req.body;

  const client: any = await createClientAsync(url);

  const resultSoap: any = {
    wsdlUrl: client.wsdl.uri,
    wsdl: client.wsdl.xml
  };

  client.search(args, (error: any, result: ISearchResults, raw: string) => {

    resultSoap.xml = raw;
    resultSoap.result = result;
    res.send(resultSoap);

  });

};
