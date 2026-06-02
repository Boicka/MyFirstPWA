import { Component, ElementRef, OnInit, ViewChildren, QueryList, computed, inject, signal, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardService } from '../../../core/services/card.service';
import { TransactionService } from '../../../core/services/transaction.service';
import { CATEGORIES } from '../../../core/models/category.model';
import { CreditCardVisualComponent } from '../../shared/components/credit-card-visual/credit-card-visual';
import { MonthSelectorComponent } from '../../shared/components/month-selector/month-selector';
import { FabComponent } from '../../shared/components/fab/fab';
import { BottomNavComponent } from '../../shared/components/bottom-nav/bottom-nav';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format.pipe';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [
    RouterLink,
    CreditCardVisualComponent,
    MonthSelectorComponent,
    FabComponent,
    BottomNavComponent,
    CurrencyFormatPipe,
  ],
  templateUrl: './cards-list.html',
  styleUrl: './cards-list.css',
})
export class CardsListComponent implements AfterViewInit {
  cardService = inject(CardService);
  txService = inject(TransactionService);
  categories = CATEGORIES;

  activeCardId = signal<string | null>(null);
  @ViewChildren('cardSlide') cardSlides!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    const firstCard = this.cardService.cards()[0];
    if (firstCard) this.activeCardId.set(firstCard.id);

    setTimeout(() => this.setupObserver(), 100);
  }

  private setupObserver(): void {
    const slides = this.cardSlides.toArray();
    if (slides.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset['cardId'];
            if (id) this.activeCardId.set(id);
          }
        }
      },
      { threshold: 0.6 }
    );

    slides.forEach(el => observer.observe(el.nativeElement));
  }

  activeCardTransactions = computed(() => {
    const id = this.activeCardId();
    if (!id) return [];
    return this.txService.filteredTransactions().filter(t => t.cardId === id);
  });

  activeCardSpent = computed(() =>
    this.activeCardTransactions()
      .filter(t => t.type === 'gasto')
      .reduce((s, t) => s + t.amount, 0)
  );

  activeCardIncome = computed(() =>
    this.activeCardTransactions()
      .filter(t => t.type === 'ingreso')
      .reduce((s, t) => s + t.amount, 0)
  );

  getCategoryMeta(key: string) {
    return this.categories.find(c => c.key === key);
  }
}
