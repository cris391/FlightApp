import 'reflect-metadata';
import * as express from 'express';
import { raw } from 'body-parser';
import { soap } from 'soap-decorators';
import { FlightController } from './controllers/flight.controller';

const app = express();

app.use(raw({ type: () => true, limit: '5mb' }));

const flightController = new FlightController();
app.use('/soap/flight', soap(flightController));

const port = '5000';
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
