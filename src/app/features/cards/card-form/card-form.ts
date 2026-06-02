import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { CardService } from '../../../core/services/card.service';
import { Card, CardNetwork, CardType } from '../../../core/models/card.model';
import { CreditCardVisualComponent } from '../../shared/components/credit-card-visual/credit-card-visual';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog';

const COLORS = [
  '#6C63FF', '#EF4444', '#22C55E', '#F59E0B',
  '#0EA5E9', '#A855F7', '#EC4899', '#14B8A6',
];

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [ReactiveFormsModule, UpperCasePipe, CreditCardVisualComponent, ConfirmDialogComponent],
  templateUrl: './card-form.html',
  styleUrl: './card-form.css',
})
export class CardFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private cardService = inject(CardService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  colors = COLORS;
  networks: CardNetwork[] = ['visa', 'mastercard', 'amex', 'other'];
  editId = signal<string | null>(null);
  showDeleteConfirm = signal(false);

  form = this.fb.group({
    name:     ['', Validators.required],
    lastFour: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
    network:  ['visa' as CardNetwork, Validators.required],
    type:     ['credito' as CardType, Validators.required],
    color:    [COLORS[0], Validators.required],
  });

  get previewCard(): Card {
    const v = this.form.value;
    return {
      id: '',
      name: v.name || 'Mi Tarjeta',
      lastFour: v.lastFour || '0000',
      network: (v.network as CardNetwork) || 'visa',
      type: (v.type as CardType) || 'credito',
      color: v.color || COLORS[0],
      createdAt: '',
    };
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const card = this.cardService.getCardById(id);
      if (card) {
        this.editId.set(id);
        this.form.patchValue(card);
      }
    }
  }

  selectColor(color: string): void {
    this.form.patchValue({ color });
  }

  selectType(type: CardType): void {
    this.form.patchValue({ type });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.value;
    const data = {
      name: v.name!,
      lastFour: v.lastFour!,
      network: v.network as CardNetwork,
      type: v.type as CardType,
      color: v.color!,
    };
    if (this.editId()) {
      this.cardService.updateCard(this.editId()!, data);
    } else {
      this.cardService.addCard(data);
    }
    this.router.navigate(['/tarjetas']);
  }

  confirmDelete(): void {
    this.showDeleteConfirm.set(true);
  }

  doDelete(): void {
    this.cardService.deleteCard(this.editId()!);
    this.router.navigate(['/tarjetas']);
  }

  cancel(): void {
    this.router.navigate(['/tarjetas']);
  }
}
