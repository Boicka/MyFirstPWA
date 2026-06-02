import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.DashboardComponent),
  },
  {
    path: 'movimientos',
    loadComponent: () =>
      import('./features/transactions/transaction-list/transaction-list').then(
        m => m.TransactionListComponent
      ),
  },
  {
    path: 'movimientos/nuevo',
    loadComponent: () =>
      import('./features/transactions/transaction-form/transaction-form').then(
        m => m.TransactionFormComponent
      ),
  },
  {
    path: 'movimientos/:id/editar',
    loadComponent: () =>
      import('./features/transactions/transaction-form/transaction-form').then(
        m => m.TransactionFormComponent
      ),
  },
  {
    path: 'tarjetas',
    loadComponent: () =>
      import('./features/cards/cards-list/cards-list').then(m => m.CardsListComponent),
  },
  {
    path: 'tarjetas/nueva',
    loadComponent: () =>
      import('./features/cards/card-form/card-form').then(m => m.CardFormComponent),
  },
  {
    path: 'tarjetas/:id/editar',
    loadComponent: () =>
      import('./features/cards/card-form/card-form').then(m => m.CardFormComponent),
  },
  { path: '**', redirectTo: 'inicio' },
];
