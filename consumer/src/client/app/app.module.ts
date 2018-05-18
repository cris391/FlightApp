
import { NgModule } from '@angular/core';

import { CoreModule } from './shared/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FlightModule } from './flight/flight.module';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    FlightModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
