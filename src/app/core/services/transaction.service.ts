import { Injectable, computed, inject, signal } from '@angular/core';
import { CategoryBreakdown, Transaction } from '../models/transaction.model';
import { CATEGORIES } from '../models/category.model';
import { StorageService } from './storage.service';

function currentMonth(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private storage = inject(StorageService);
  private _transactions = signal<Transaction[]>(this.storage.getTransactions());

  readonly selectedMonth = signal<string>(currentMonth());
  readonly transactions = this._transactions.asReadonly();

  readonly filteredTransactions = computed(() =>
    this._transactions().filter(t => t.date.startsWith(this.selectedMonth())).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  );

  readonly totalIngresos = computed(() =>
    this.filteredTransactions()
      .filter(t => t.type === 'ingreso')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly totalGastos = computed(() =>
    this.filteredTransactions()
      .filter(t => t.type === 'gasto')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly balance = computed(() => this.totalIngresos() - this.totalGastos());

  readonly categoryBreakdown = computed((): CategoryBreakdown[] => {
    const gastos = this.filteredTransactions().filter(t => t.type === 'gasto');
    const total = gastos.reduce((s, t) => s + t.amount, 0);
    if (total === 0) return [];

    const map = new Map<string, number>();
    for (const t of gastos) {
      map.set(t.category, (map.get(t.category) ?? 0) + t.amount);
    }

    return [...map.entries()]
      .map(([key, catTotal]) => {
        const meta = CATEGORIES.find(c => c.key === key)!;
        return {
          category: meta.key,
          label: meta.label,
          icon: meta.icon,
          color: meta.color,
          total: catTotal,
          percentage: Math.round((catTotal / total) * 100),
        };
      })
      .sort((a, b) => b.total - a.total);
  });

  addTransaction(data: Omit<Transaction, 'id' | 'createdAt'>): void {
    const tx: Transaction = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    this._transactions.update(list => [...list, tx]);
    this.storage.setTransactions(this._transactions());
  }

  updateTransaction(id: string, patch: Partial<Omit<Transaction, 'id' | 'createdAt'>>): void {
    this._transactions.update(list => list.map(t => (t.id === id ? { ...t, ...patch } : t)));
    this.storage.setTransactions(this._transactions());
  }

  deleteTransaction(id: string): void {
    this._transactions.update(list => list.filter(t => t.id !== id));
    this.storage.setTransactions(this._transactions());
  }

  setSelectedMonth(month: string): void {
    this.selectedMonth.set(month);
  }

  getTransactionsForCard(cardId: string): Transaction[] {
    return this._transactions().filter(t => t.cardId === cardId);
  }

  getTransactionById(id: string): Transaction | undefined {
    return this._transactions().find(t => t.id === id);
  }
}
