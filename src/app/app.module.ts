import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map/map.component';
import { InputControlComponent } from './input-control/input-control.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HauteurQuaiComponent } from './hauteur-quai/hauteur-quai.component';
import { CrowdComponent } from './crowd/crowd.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    InputControlComponent,
    HauteurQuaiComponent,
    CrowdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
