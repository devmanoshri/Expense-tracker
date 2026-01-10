import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localeNb from '@angular/common/locales/nb';
import {
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

registerLocaleData(localeNb);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'nb-NO' },
  ],
};
