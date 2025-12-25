import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransactionEditComponent } from './components/transaction-edit/transaction-edit.component';

export const routes: Routes = [
    { path: '', component: TransactionsComponent },
    { path: 'transactions/edit/:id', component: TransactionEditComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
