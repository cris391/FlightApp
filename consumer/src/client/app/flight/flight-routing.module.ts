import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlightComponent } from './flight.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: FlightComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightRoutingModule { }
