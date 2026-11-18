import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'catalogue',
    loadComponent: () =>
      import('./pages/catalogue/catalogue.component').then(
        (component) => component.CatalogueComponent
      )
  },
  { path: '', redirectTo: 'catalogue', pathMatch: 'full' },
  { path: '**', redirectTo: 'catalogue' }
];
