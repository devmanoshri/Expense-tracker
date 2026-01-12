import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { transactionAccessGuard } from './components/pages/manage-transaction/transaction-access.guard';
import { transactionsResolver } from './components/pages/manage-transaction/transactions.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    loadComponent: () => {
      return import('./components/pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      );
    },
  },
  {
    path: 'manage-transaction',
    resolve: {
      transactions: transactionsResolver,
    },
    canActivate:[transactionAccessGuard],
    loadComponent: () => {
      return import('./components/pages/manage-transaction/manage-transaction.component').then(
        (m) => m.ManageTransactionComponent,
      );
    },
  },
  {
    path: 'chart-preview',
    loadComponent: () => {
      return import('./components/pages/chart-preview/chart-preview.component').then(
        (m) => m.ChartPreviewComponent,
      );
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
