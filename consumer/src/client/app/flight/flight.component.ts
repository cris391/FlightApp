import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {

  public loading = false;

  public request: any;
  public respond: any;
  public wsdl: string;
  public wsdlUri: string;

  public results: any = null;

  myForm: FormGroup;

  constructor(
    private readonly http: Http,
    private readonly fb: FormBuilder,
  ) { }

  public ngOnInit() {
    this.myForm = this.fb.group({
      from: ['CZ', Validators.compose([Validators.required])],
      to: ['porto', Validators.compose([Validators.required])],
      fromDate: [new Date, Validators.compose([Validators.required])],
      toDate: [new Date, Validators.compose([Validators.required])],
      format: ['rest', Validators.compose([Validators.required])],
    });
  }

  public onSubmit(flight) {
    this.resetResult();
    this.loading = true;
    const fromDate = `${flight.fromDate.getDate()}%2F${flight.fromDate.getMonth() + 1}%2F${flight.fromDate.getFullYear()}`;
    const toDate = `${flight.toDate.getDate()}%2F${flight.toDate.getMonth() + 1}%2F${flight.toDate.getFullYear()}`;

    if (flight.format === 'rest') {

      const url = `http://localhost:4000/flight?from=${flight.from}&to=${flight.to}&fromDate=${fromDate}&toDate=${toDate}`;

      this.http
        .get(url)
        .map(res => res.json())
        .subscribe((results) => {

          this.results = results;

          console.log(this.results);

          this.loading = false;
          this.request = `${url}`;
          this.respond = JSON.stringify(results, null, 2);

        });

    } else {

      const body = {
        from: flight.from,
        to: flight.to,
        fromDate: fromDate,
        toDate: toDate,
      };

      this.http
        .post('/soap', body)
        .map((data) => data.json())
        .subscribe(({ result, wsdl, wsdlUrl, xml }) => {

          this.request = `
          <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:flight="http://localhost:3000/soap/flight">
            <soapenv:Header/>
            <soapenv:Body>
              <flight:search>
                <from>${body.from}</from>
                <to>${body.to}</to>
                <fromDate>${body.fromDate}</fromDate>
                <toDate>${body.toDate}</toDate>
              </flight:search>
            </soapenv:Body>
          </soapenv:Envelope>`;

          this.loading = false;
          this.results = result;
          this.respond = this.formatXml(xml);
          this.wsdl = wsdl;
          this.wsdlUri = wsdlUrl;
        });
    }

  }

  private resetResult() {
    this.request = '';
    this.respond = '';
    this.wsdl = '';
    this.wsdlUri = '';
  }

  private formatXml(xml) {
    let formatted = '';
    const reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    let pad = 0;

    const stringArray = xml.split('\r\n');

    for (const node of stringArray) {

      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/)) {
        if (pad !== 0) {
          pad -= 1;
        }
      } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }
      let padding = '';
      for (let i = 0; i < pad; i++) {
        padding += '  ';
      }
      formatted += padding + node + '\r\n';
      pad += indent;
    }

    return formatted;
  }

}
