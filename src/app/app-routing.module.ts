import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'clients',
    loadChildren: './clients/clients.module#ClientsModule'
  },
  {
    path: 'vouchers',
    loadChildren: './vouchers/vouchers.module#VouchersModule'
  },
  {
    path: 'items',
    loadChildren: './items/items.module#ItemsModule'
  },
  {
    path: 'actions',
    loadChildren: './actions/actions.module#ActionsModule'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
