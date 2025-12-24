import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { ExpenseEditComponent } from './components/expense-edit/expense-edit.component';
//import { MathPdfGeneratorComponent } from './components/math-pdf-generator/math-pdf-generator.component';

export const routes: Routes = [
    { path: '', component: ExpensesComponent },
    { path: 'expenses/edit/:id', component: ExpenseEditComponent },
   // { path: 'math', component: MathPdfGeneratorComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
