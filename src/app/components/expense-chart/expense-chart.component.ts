import { Component, Input, OnChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Expense } from '../../models/expense.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-expense-chart',
  templateUrl: './expense-chart.component.html',
  styleUrl: './expense-chart.component.scss'
})

export class ExpenseChartComponent implements OnChanges {

  @Input() expenses: Expense[] = [];
  chart: any;

  constructor(private categoriesService: CategoriesService) {}

  ngOnChanges() {
    this.renderChart();
  }

  renderChart() {
    const categoryTotals: Record<string, number> = {};

    this.expenses.forEach(e => {
      const categoryName =
        this.categoriesService.getCategoryName(e.categoryId);

      categoryTotals[categoryName] =
        (categoryTotals[categoryName] || 0) + e.amount;
    });

    if (this.chart) this.chart.destroy();

    this.chart = new Chart('expenseChart', {
      type: 'doughnut',
      data: {
        labels: Object.keys(categoryTotals), 
        datasets: [{
          data: Object.values(categoryTotals)
        }]
      }
    });
  }
}
