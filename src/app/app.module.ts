import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material-module';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { MatIconModule, MatSpinner } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDataService } from './in-memory-data.service';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderMenuComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    /* Forms */
    FormsModule,
    ReactiveFormsModule,    
    // Icon
    MatIconModule,

    // Angular Material
    BrowserAnimationsModule,
    MaterialModule,

    // HTTP
    HttpClientModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],  
  entryComponents: [
    // Loading Animation
    MatSpinner
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
