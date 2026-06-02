import { Injectable, computed, inject, signal } from '@angular/core';
import { Card } from '../models/card.model';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class CardService {
  private storage = inject(StorageService);
  private _cards = signal<Card[]>(this.storage.getCards());

  readonly cards = this._cards.asReadonly();
  readonly cardCount = computed(() => this._cards().length);

  addCard(data: Omit<Card, 'id' | 'createdAt'>): void {
    const card: Card = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    this._cards.update(list => [...list, card]);
    this.storage.setCards(this._cards());
  }

  updateCard(id: string, patch: Partial<Omit<Card, 'id' | 'createdAt'>>): void {
    this._cards.update(list => list.map(c => (c.id === id ? { ...c, ...patch } : c)));
    this.storage.setCards(this._cards());
  }

  deleteCard(id: string): void {
    this._cards.update(list => list.filter(c => c.id !== id));
    this.storage.setCards(this._cards());
  }

  getCardById(id: string): Card | undefined {
    return this._cards().find(c => c.id === id);
  }
}
