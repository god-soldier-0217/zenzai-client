import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VouchersRoutingModule } from './vouchers-routing.module';
import { VoucherListComponent } from './voucher-list/voucher-list.component';

@NgModule({
  declarations: [VoucherListComponent],
  imports: [
    CommonModule,
    VouchersRoutingModule
  ]
})
export class VouchersModule { }
