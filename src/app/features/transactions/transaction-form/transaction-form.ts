import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../../core/services/transaction.service';
import { CardService } from '../../../core/services/card.service';
import { CATEGORIES } from '../../../core/models/category.model';
import { TransactionType } from '../../../core/models/transaction.model';
import { CreditCardVisualComponent } from '../../shared/components/credit-card-visual/credit-card-visual';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [ReactiveFormsModule, CreditCardVisualComponent],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css',
})
export class TransactionFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private txService = inject(TransactionService);
  private cardService = inject(CardService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  cards = this.cardService.cards;
  categories = CATEGORIES;
  editId = signal<string | null>(null);
  shakeAmount = signal(false);
  selectedType = signal<TransactionType>('gasto');

  form = this.fb.group({
    type: ['gasto' as TransactionType],
    amount: [null as number | null, [Validators.required, Validators.min(0.01)]],
    description: ['', Validators.required],
    category: ['comida', Validators.required],
    cardId: [null as string | null],
    date: [new Date().toISOString().split('T')[0], Validators.required],
  });

  get filteredCategories() {
    const type = this.selectedType();
    return this.categories.filter(c => c.forType === type || c.forType === 'ambos');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const tx = this.txService.getTransactionById(id);
      if (tx) {
        this.editId.set(id);
        this.selectedType.set(tx.type);
        this.form.patchValue({ ...tx, amount: tx.amount });
      }
    }
  }

  selectType(type: TransactionType): void {
    this.selectedType.set(type);
    this.form.patchValue({ type, category: type === 'gasto' ? 'comida' : 'salario' });
  }

  selectCategory(key: string): void {
    this.form.patchValue({ category: key });
  }

  selectCard(id: string | null): void {
    this.form.patchValue({ cardId: id });
  }

  save(): void {
    if (this.form.invalid) {
      this.shakeAmount.set(true);
      setTimeout(() => this.shakeAmount.set(false), 500);
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.value;
    const data = {
      type: v.type as TransactionType,
      amount: Number(v.amount),
      description: v.description!,
      category: v.category as any,
      cardId: v.cardId ?? null,
      date: v.date!,
    };
    if (this.editId()) {
      this.txService.updateTransaction(this.editId()!, data);
    } else {
      this.txService.addTransaction(data);
    }
    this.router.navigate(['/movimientos']);
  }

  cancel(): void {
    this.router.navigate(['/movimientos']);
  }
}
