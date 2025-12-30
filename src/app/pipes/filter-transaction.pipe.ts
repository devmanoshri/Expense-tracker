import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Pipe({
  name: 'filterTransaction',
  standalone: true
})
export class FilterTransactionPipe implements PipeTransform {

  transform(transactions: Transaction[], selectedCategoryId: string | null, fromDate: string, toDate: string): Transaction[] {

    if (!selectedCategoryId && !fromDate && !toDate) {
      return transactions;
    }

    return transactions.filter((transaction) => {

      switch (selectedCategoryId) {
        case 'income':
          if (transaction.type !== 'income') { return false; }
          break;
        default:
          if (transaction.type !== 'expense') { return false; }
          if (transaction.categoryId !== selectedCategoryId) { return false; }
          break;
      }

      const transactionDate = new Date(transaction.date).getTime();
      const from = fromDate ? new Date(fromDate).getTime() : null;
      const to = toDate ? new Date(toDate).getTime() : null;

      if (from && transactionDate < from) return false;
      if (to && transactionDate > to) return false;

      return true;
    });

  }

}
