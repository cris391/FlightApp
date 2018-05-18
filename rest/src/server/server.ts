import 'reflect-metadata';
import { urlencoded, json } from 'body-parser';;
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';

import './controllers/flight.controller';
import { FlightService } from './services/flight.service';

// set up container
const container = new Container();

container.bind<FlightService>('FlightService').to(FlightService);

const server = new InversifyExpressServer(container);

server.setConfig((IES) => {

  IES.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  IES.use(urlencoded({
    extended: true
  }));
  IES.use(json());

});

const app = server.build();

const port = process.env.PORT || '4000';
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
