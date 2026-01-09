import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction } from '../../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionMockService {

  getTransactions(): Observable<Transaction[]> {
    return of([{} as Transaction]);
  }

  getTransactionById(id: string): Observable<Transaction> {
    return of({} as Transaction);
  }

  deleteTransaction(id: string): Observable<void> {
    return of();
  }

  saveTransaction(
    transaction: Transaction,
    operation: 'add' | 'update',
  ): Observable<Transaction> {
    if (operation === 'add') {
      return this.addTransaction(transaction);
    } else {
      return this.updateTransaction(transaction);
    }
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return of({} as Transaction);
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return of({} as Transaction);
  }
}
