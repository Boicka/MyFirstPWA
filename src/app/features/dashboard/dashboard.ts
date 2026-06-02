import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TransactionService } from '../../core/services/transaction.service';
import { CardService } from '../../core/services/card.service';
import { CATEGORIES } from '../../core/models/category.model';
import { SummaryCardComponent } from '../shared/components/summary-card/summary-card';
import { MonthSelectorComponent } from '../shared/components/month-selector/month-selector';
import { CreditCardVisualComponent } from '../shared/components/credit-card-visual/credit-card-visual';
import { FabComponent } from '../shared/components/fab/fab';
import { BottomNavComponent } from '../shared/components/bottom-nav/bottom-nav';
import { CurrencyFormatPipe } from '../shared/pipes/currency-format.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    SummaryCardComponent,
    MonthSelectorComponent,
    CreditCardVisualComponent,
    FabComponent,
    BottomNavComponent,
    CurrencyFormatPipe,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  txService = inject(TransactionService);
  cardService = inject(CardService);
  categories = CATEGORIES;

  get recentTransactions() {
    return this.txService.filteredTransactions().slice(0, 5);
  }

  getCategoryMeta(key: string) {
    return this.categories.find(c => c.key === key);
  }

  getCardName(cardId: string | null): string {
    if (!cardId) return 'Efectivo';
    return this.cardService.getCardById(cardId)?.name ?? 'Tarjeta';
  }
}
