import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesMockService {
  mockCategories: Category[] = [
    {
      id: 'string',
      name: 'string',
      type: 'expense',
    },
  ];

  getCategories(): Observable<Category[]> {
    return of(this.mockCategories);
  }
}
