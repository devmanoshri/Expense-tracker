import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Transaction } from '../../models/transaction.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-transaction-chart',
  standalone: true,
  templateUrl: './transaction-chart.component.html',
})
export class TransactionChartComponent
  implements OnChanges, AfterViewInit {

  @Input() transactions: Transaction[] = [];

  @ViewChild('chartCanvas')
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart?: Chart;
  private viewReady = false;

  constructor(private categoriesService: CategoriesService) { }

  ngAfterViewInit() {
    this.viewReady = true;
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['transactions'] && this.viewReady) {
      this.renderChart();
    }
  }

  renderChart() {
    if (!this.chartCanvas || !this.transactions.length) return;

    const incomeTotals: Record<string, number> = {};
    const expenseTotals: Record<string, number> = {};

    this.transactions.forEach(t => {
      if (t.type === 'income') {
        incomeTotals['Income'] =
          (incomeTotals['Income'] || 0) + t.amount;
      } else {
        if (t.categoryId) {
          const category =
            this.categoriesService.getCategoryName(t.categoryId);
          expenseTotals[category] =
            (expenseTotals[category] || 0) + t.amount;
        }

      }
    });

    const labels = [
      ...Object.keys(incomeTotals),
      ...Object.keys(expenseTotals)
    ];

    const incomeData = labels.map(l => incomeTotals[l] || 0);
    const expenseData = labels.map(l => expenseTotals[l] || 0);

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            label: 'Income',
            data: incomeData,
            backgroundColor: 'green'
          },
          {
            label: 'Expense',
            data: expenseData,
            backgroundColor: 'red'
          }
        ]
      }
    });
  }
}
