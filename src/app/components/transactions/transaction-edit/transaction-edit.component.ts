import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Category } from '../../../models/category.model';
import { Transaction, TransactionType } from '../../../models/transaction.model';
import { FilterCategoryPipe } from "../../../pipes/filter-category.pipe";
import { CategoryStoreService } from '../../../services/category-store.service';
import { TransactionStoreService } from '../../../services/transaction-store.service';
import { TransactionService } from '../../../services/transaction.service';

@Component({
  selector: 'app-transaction-edit',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, JsonPipe, FilterCategoryPipe],
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.scss']
})

export class TransactionEditComponent implements OnInit {

  transactions$: Observable<Transaction[]> = of([]);
  categories$: Observable<Category[]> = of([]);
  selectedTransaction: Transaction | undefined;
  updatedTransaction: Transaction | undefined;

  private categoryStoreServices = inject(CategoryStoreService);
  private transactionStoreServices = inject(TransactionStoreService);
  private transactionService = inject(TransactionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  editTransactionForm = this.formBuilder.nonNullable.group({
    type: ['expense' as TransactionType, Validators.required],
    title: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(1)]],
    categoryId: [''],
    date: ['', Validators.required]
  });

  ngOnInit(): void {
    const editId = this.route.snapshot.paramMap.get('id');
    if (!editId) return;

    this.categoryStoreServices.initCategory();
    this.transactionStoreServices.initTransaction();

    this.transactions$ = this.transactionStoreServices.transactions$;
    this.categories$ = this.categoryStoreServices.categories$;


    this.transactions$.subscribe((transactions) => transactions.filter((transaction) => {
      if (transaction.id === editId) {
        this.selectedTransaction = transaction;
        this.editTransactionForm.get('type')?.setValue(transaction.type);
        this.editTransactionForm.get('title')?.setValue(transaction.title);
        this.editTransactionForm.get('categoryId')?.setValue(transaction.categoryId);
        this.editTransactionForm.get('amount')?.setValue(transaction.amount);
        this.editTransactionForm.get('date')?.setValue(transaction.date);
      }
    }));

  }

  updateTransaction(): void {
    if (!this.selectedTransaction || this.editTransactionForm.invalid) {
      return;
    }

    const updatedTransactionData: Transaction = {
      ...this.selectedTransaction,
      ...this.editTransactionForm.value
    };

    this.transactionService.updateTransaction(updatedTransactionData)
      .subscribe(() => {
        alert('Transaction updated successfully!');
        this.transactionStoreServices.initTransaction(true)
        this.router.navigate(['/']);
      });
  }



  cancelEdit(): void {
    this.router.navigate(['/']);
  }
}
