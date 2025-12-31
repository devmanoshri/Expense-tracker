import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../models/transaction.model';

interface FilterOptions {
  transactionType: string;
  selectedCategoryId: string | null;
  fromDate: string;
  toDate: string;
}

@Pipe({
  name: 'filterTransaction',
  standalone: true,
})
export class FilterTransactionPipe implements PipeTransform {
  transform(
    transactions: Transaction[],
    filterOptions: FilterOptions
  ): Transaction[] {
    const { transactionType, selectedCategoryId, fromDate, toDate } =
      filterOptions;
    if (!transactionType && !selectedCategoryId && !fromDate && !toDate) {
      return transactions;
    }

    if (selectedCategoryId === '') {
      return transactions.filter(
        (transaction) => transaction.type === transactionType
      );
    }

    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date).getTime();
      const from = fromDate ? new Date(fromDate).getTime() : null;
      const to = toDate ? new Date(toDate).getTime() : null;

      if (transaction.categoryId !== selectedCategoryId) {
        return false;
      }
      if (from && transactionDate < from) return false;
      if (to && transactionDate > to) return false;

      return true;
    });
  }
}
