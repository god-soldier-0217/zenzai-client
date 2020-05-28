import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material-module';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Icon
    MatIconModule,

    // Angular Material
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
