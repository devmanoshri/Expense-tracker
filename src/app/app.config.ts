import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localeNb from '@angular/common/locales/nb';
import {
  ApplicationConfig,
  inject,
  LOCALE_ID,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { TransactionStoreService } from './services/transaction-store.service';
import { CategoryStoreService } from './services/category-store.service';

registerLocaleData(localeNb);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'nb-NO' },
    provideAppInitializer(() => {
      const transactionStoreService = inject(TransactionStoreService);
      const categoryStoreService = inject(CategoryStoreService);
      
      transactionStoreService.initTransaction();
      categoryStoreService.initCategory();
    }),
  ],
};
