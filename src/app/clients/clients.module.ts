import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { MatIconModule, MatSpinner } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClientListComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    
    /* Forms */
    FormsModule,
    ReactiveFormsModule,   
    // Icon
    MatIconModule,

    // Angular Material
    MaterialModule,
  ],
  entryComponents: [
    // Loading Animation
    MatSpinner
  ],
})
export class ClientsModule { }
