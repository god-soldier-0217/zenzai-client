import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsRoutingModule } from './actions-routing.module';
import { ActionListComponent } from './action-list/action-list.component';

@NgModule({
  declarations: [ActionListComponent],
  imports: [
    CommonModule,
    ActionsRoutingModule
  ]
})
export class ActionsModule { }
