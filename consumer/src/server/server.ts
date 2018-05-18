import 'reflect-metadata';
import { join } from 'path';
import * as express from 'express';
import { urlencoded, json, raw } from 'body-parser';

import * as soapClient from './soap/soap.client';

const app = express();

app.use(express.static(join(__dirname, '../../dist/client')));

app.use(urlencoded({
  extended: true
}));

app.use(json());
app.use(raw({ type: () => true, limit: '5mb' }));

app.post('/soap', soapClient.index);

app.get('*', (req, res) => {

  res.sendFile(join(__dirname, '../../dist/client/index.html'));

});

const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
