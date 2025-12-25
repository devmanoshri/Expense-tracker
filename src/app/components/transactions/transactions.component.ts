import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category.model';
//import { ExpenseChartComponent } from "../expense-chart/expense-chart.component";
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  imports: [FormsModule, CommonModule, RouterLink],
  standalone: true
})

export class TransactionsComponent implements OnInit {

  transactions: Transaction[] = [];
  categories: Category[] = [];
  selectedCategoryId: string | null = null;

  newTransaction: Transaction = {
    title: '',
    amount: 0,
    categoryId: '',
    date: '',
    type: 'income'
  };

  editTransactionId: string | null = null;

  constructor(private transactionService: TransactionService, private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.loadTransaction();
    this.loadCategories();
  }

  loadTransaction() {
    this.transactionService.getTransactions()
      .subscribe(transaction => this.transactions = transaction);
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(category => this.categories = category)
  }

  getFilteredTransactions(): Transaction[] {
    if (!this.selectedCategoryId) return this.transactions;
    return this.transactions.filter((transaction) => transaction.categoryId === this.selectedCategoryId);
  }

  getCategoryName(catId: string): string {
    return this.categoryService.getCategoryName(catId);
  }

  addTransaction(): void {
    this.transactionService.addTransaction(this.newTransaction)
      .subscribe(() => {
        this.loadTransaction();
        this.newTransaction = { title: '', amount: 0, categoryId: '', date: '', type: 'expense' };
      });
  }

  editTransaction(transaction: Transaction): void {
    this.editTransactionId = transaction.id!;
    this.newTransaction = { ...transaction };
  }

  updateTransaction(): void {
    this.transactionService.updateTransaction(this.newTransaction)
      .subscribe(() => {
        this.loadTransaction();
        this.editTransactionId = null;
        this.resetForm();
      });
  }

  deleteTransaction(id: string): void {
    this.transactionService.deleteTransaction(id)
      .subscribe(() => this.loadTransaction());
  }

  cancelEdit(): void {
    this.resetForm();
    this.editTransactionId = null;
  }

  resetForm(): void {
    this.newTransaction = {
      title: '',
      amount: 0,
      categoryId: '',
      date: '',
      type: 'expense'
    };
  }

  getTotalTransaction(): number {
    return this.getFilteredTransactions().reduce((sum, transactionItem) => sum + transactionItem.amount, 0);
  }
}


