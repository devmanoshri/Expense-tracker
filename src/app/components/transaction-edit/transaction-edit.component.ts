import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';   
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './transaction-edit.component.html',
  styleUrl: './transaction-edit.component.scss'
})
export class TransactionEditComponent implements OnInit {

  transaction!: Transaction;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.transactionService.getTransactionById(id)
      .subscribe(data => {
        this.transaction = data;
      });
  }

  updateTransaction(): void {
    this.transactionService.updateTransaction(this.transaction)
      .subscribe(() => this.router.navigate(['/']));
  }
}
