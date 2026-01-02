import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Category } from '../../../models/category.model';
import {
  Transaction,
  TransactionType,
} from '../../../models/transaction.model';
import { FilterCategoryPipe } from '../../../pipes/filter-category.pipe';
import { CategoryStoreService } from '../../../services/category-store.service';
import { TransactionStoreService } from '../../../services/transaction-store.service';
import { TransactionService } from '../../../services/transaction.service';

@Component({
  selector: 'app-transaction-add-edit',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, FilterCategoryPipe],
  templateUrl: './transaction-add-edit.component.html',
  styleUrls: ['./transaction-add-edit.component.scss'],
})
export class TransactionAddEditComponent implements OnInit {
  @Input() transaction = {} as Transaction;
  @Input() isEdit = false;

  @Output() abort = new EventEmitter<void>();

  transactions$: Observable<Transaction[]> = of([]);
  categories$: Observable<Category[]> = of([]);
  updatedTransaction: Transaction | undefined;

  private categoryStoreServices = inject(CategoryStoreService);
  private transactionStoreServices = inject(TransactionStoreService);
  private transactionService = inject(TransactionService);
  private formBuilder = inject(FormBuilder);

  transactionForm = this.formBuilder.nonNullable.group({
    transactionType: ['income' as TransactionType, Validators.required],
    title: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(1)]],
    categoryId: [''],
    transactionDate: ['', Validators.required],
  });

  ngOnInit(): void {
    this.categoryStoreServices.initCategory();
    this.transactionStoreServices.initTransaction();

    this.transactions$ = this.transactionStoreServices.transactions$;
    this.categories$ = this.categoryStoreServices.categories$;

    if (this.isEdit) {
      if (Object.keys(this.transaction).length) {
        this.transactionForm
          .get('transactionType')
          ?.setValue(this.transaction.type);
        this.transactionForm.get('title')?.setValue(this.transaction.title);
        this.transactionForm
          .get('categoryId')
          ?.setValue(this.transaction.categoryId);
        this.transactionForm.get('amount')?.setValue(this.transaction.amount);
        this.transactionForm
          .get('transactionDate')
          ?.setValue(this.transaction.date);
      }
    }
  }

  onSubmit(): void {
    if (this.transactionForm.invalid) {
      return;
    }
    const formValue = this.transactionForm.value;
    const data = Object.assign(this.transaction, {
      type: formValue.transactionType,
      title: formValue.title,
      amount: formValue.amount,
      categoryId: formValue.categoryId,
      date: formValue.transactionDate,
    });

    this.isEdit ? this.updateTransaction(data) : this.addTransaction(data);
  }

  private updateTransaction(data: Transaction): void {
    this.transactionService.updateTransaction(data).subscribe(() => {
      alert('Transaction updated successfully!');
      this.transactionStoreServices.initTransaction(true);
    });
  }

  private addTransaction(data: Transaction): void {
    this.transactionService.addTransaction(data).subscribe(() => {
      alert('Transaction added seccessfully!');
      this.transactionStoreServices.initTransaction(true);
    });
  }
}
