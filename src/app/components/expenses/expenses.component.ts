import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category.model';
import { ExpenseChartComponent } from "../expense-chart/expense-chart.component";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  imports: [FormsModule, CommonModule, RouterLink, ExpenseChartComponent],
  standalone: true
})

export class ExpensesComponent implements OnInit {

  expenses: Expense[] = [];
  categories: Category[] = [];
  selectedCategoryId: number | null = null;

  newExpense: Expense = {
    title: '',
    amount: 0,
    categoryId: 0,
    date: ''
  };

  constructor(private expenseService: ExpenseService, private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.loadExpenses();
    this.loadCategories();
  }

  editExpenseId: number | null = null;

  loadExpenses() {
    this.expenseService.getExpenses()
      .subscribe(expense => this.expenses = expense);
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(category => this.categories = category)
  }

  getFilteredExpenses(): Expense[] {
    if (!this.selectedCategoryId) return this.expenses;
    return this.expenses.filter((expense) => expense.categoryId === this.selectedCategoryId);
  }

  getCategoryName(catId: number): string {
    return this.categories.find(data => data.id === catId)?.name || '';
  }

  addExpense(): void {
    this.expenseService.addExpense(this.newExpense)
      .subscribe(() => {
        this.loadExpenses();
        this.newExpense = { title: '', amount: 0, categoryId: 0, date: '' };
      });
  }

  editExpense(expense: Expense): void {
    this.editExpenseId = expense.id!;
    this.newExpense = { ...expense };
  }

  updateExpense(): void {
    this.expenseService.updateExpense(this.newExpense)
      .subscribe(() => {
        this.loadExpenses();
        this.editExpenseId = null;
        this.resetForm();
      });
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id)
      .subscribe(() => this.loadExpenses());
  }
  cancelEdit(): void {
    this.resetForm();
    this.editExpenseId = null;
  }

  resetForm(): void {
    this.newExpense = {
      title: '',
      amount: 0,
      categoryId: 0,
      date: ''
    };
  }

  getTotalExpense(): number {
    return this.getFilteredExpenses().reduce((sum, expenseItem) => sum + expenseItem.amount, 0);
  }
}


