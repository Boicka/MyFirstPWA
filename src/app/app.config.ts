import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { routes } from './app.routes';

function seedDevData(): void {
  if (!isDevMode()) return;
  if (localStorage.getItem('ct_seeded')) return;

  const cards = [
    { id: 'card-1', name: 'BBVA Azul', lastFour: '4231', network: 'visa', type: 'credito', color: '#0EA5E9', createdAt: new Date().toISOString() },
    { id: 'card-2', name: 'Nubank Black', lastFour: '8812', network: 'mastercard', type: 'credito', color: '#A855F7', createdAt: new Date().toISOString() },
  ];

  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, '0');
  const d = (n: number) => `${y}-${m}-${String(n).padStart(2, '0')}`;

  const txs = [
    { id: 'tx-1', type: 'ingreso', amount: 18000, description: 'Salario junio', category: 'salario', cardId: 'card-1', date: d(1), createdAt: new Date().toISOString() },
    { id: 'tx-2', type: 'gasto', amount: 850, description: 'Supermercado', category: 'comida', cardId: 'card-1', date: d(3), createdAt: new Date().toISOString() },
    { id: 'tx-3', type: 'gasto', amount: 320, description: 'Uber', category: 'transporte', cardId: 'card-2', date: d(5), createdAt: new Date().toISOString() },
    { id: 'tx-4', type: 'gasto', amount: 1200, description: 'Netflix + Spotify', category: 'entretenimiento', cardId: 'card-2', date: d(7), createdAt: new Date().toISOString() },
    { id: 'tx-5', type: 'gasto', amount: 450, description: 'Farmacia', category: 'salud', cardId: null, date: d(9), createdAt: new Date().toISOString() },
    { id: 'tx-6', type: 'gasto', amount: 2300, description: 'Ropa', category: 'compras', cardId: 'card-1', date: d(12), createdAt: new Date().toISOString() },
    { id: 'tx-7', type: 'ingreso', amount: 4500, description: 'Freelance diseño', category: 'freelance', cardId: 'card-2', date: d(15), createdAt: new Date().toISOString() },
    { id: 'tx-8', type: 'gasto', amount: 680, description: 'Restaurante', category: 'comida', cardId: 'card-1', date: d(18), createdAt: new Date().toISOString() },
    { id: 'tx-9', type: 'gasto', amount: 5800, description: 'Renta', category: 'hogar', cardId: null, date: d(1), createdAt: new Date().toISOString() },
    { id: 'tx-10', type: 'gasto', amount: 950, description: 'Curso de Angular', category: 'educacion', cardId: 'card-2', date: d(20), createdAt: new Date().toISOString() },
  ];

  localStorage.setItem('ct_cards', JSON.stringify(cards));
  localStorage.setItem('ct_transactions', JSON.stringify(txs));
  localStorage.setItem('ct_seeded', '1');
}

seedDevData();

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
