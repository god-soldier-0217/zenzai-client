import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';

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
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '',
    redirectTo: '/clients',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
