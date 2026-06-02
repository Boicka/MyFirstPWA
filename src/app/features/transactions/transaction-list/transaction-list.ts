import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TransactionService } from '../../../core/services/transaction.service';
import { CardService } from '../../../core/services/card.service';
import { CATEGORIES } from '../../../core/models/category.model';
import { TransactionType } from '../../../core/models/transaction.model';
import { MonthSelectorComponent } from '../../shared/components/month-selector/month-selector';
import { FabComponent } from '../../shared/components/fab/fab';
import { BottomNavComponent } from '../../shared/components/bottom-nav/bottom-nav';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format.pipe';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    RouterLink,
    MonthSelectorComponent,
    FabComponent,
    BottomNavComponent,
    ConfirmDialogComponent,
    CurrencyFormatPipe,
  ],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
})
export class TransactionListComponent {
  txService = inject(TransactionService);
  private cardService = inject(CardService);
  categories = CATEGORIES;

  filter = signal<'todos' | TransactionType>('todos');
  deletingId = signal<string | null>(null);
  removingId = signal<string | null>(null);

  displayedTransactions = computed(() => {
    const f = this.filter();
    const txs = this.txService.filteredTransactions();
    return f === 'todos' ? txs : txs.filter(t => t.type === f);
  });

  getCategoryMeta(key: string) {
    return this.categories.find(c => c.key === key);
  }

  getCardName(cardId: string | null): string {
    if (!cardId) return 'Efectivo';
    return this.cardService.getCardById(cardId)?.name ?? 'Tarjeta';
  }

  setFilter(f: 'todos' | TransactionType): void {
    this.filter.set(f);
  }

  requestDelete(id: string): void {
    this.deletingId.set(id);
  }

  confirmDelete(): void {
    const id = this.deletingId();
    if (!id) return;
    this.removingId.set(id);
    setTimeout(() => {
      this.txService.deleteTransaction(id);
      this.removingId.set(null);
      this.deletingId.set(null);
    }, 280);
  }

  cancelDelete(): void {
    this.deletingId.set(null);
  }
}
