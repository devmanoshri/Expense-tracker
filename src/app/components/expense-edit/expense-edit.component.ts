import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense-edit',
  imports: [FormsModule],
  templateUrl: './expense-edit.component.html',
  styleUrl: './expense-edit.component.scss'
})


export class ExpenseEditComponent implements OnInit {

  expense!: Expense;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expenseService: ExpenseService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

  this.expenseService.getExpenseById(id)
      .subscribe(data => this.expense = data);
  }

  updateExpense(): void {
    this.expenseService.updateExpense(this.expense)
      .subscribe(() => this.router.navigate(['/']));
  }
}
