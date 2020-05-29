import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material-module';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { MatIconModule, MatSpinner } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderMenuComponent
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
  ],  
  entryComponents: [
    // Loading Animation
    MatSpinner
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
