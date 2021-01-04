import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapComponent } from './map/map.component';
import { DeniveleComponent } from './denivele/denivele.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EtapeComponent } from './etape/etape.component';
import {GlobalConstantes} from '../app/Service/global-constantes'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MapComponent,
    DeniveleComponent,
    EtapeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GlobalConstantes],
  bootstrap: [AppComponent],
  entryComponents: [EtapeComponent]
})
export class AppModule { }
