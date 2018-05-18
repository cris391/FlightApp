import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap';

import { CoreModule } from '../shared/core.module';
import { FlightComponent } from './flight.component';
import { FlightRoutingModule } from './flight-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FlightRoutingModule,
    CoreModule,
    AlertModule.forRoot(),
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [FlightComponent],
  exports: [FlightComponent]
})
export class FlightModule { }
