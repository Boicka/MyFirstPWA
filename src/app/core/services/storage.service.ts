import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import { Transaction } from '../models/transaction.model';

const KEYS = {
  cards: 'ct_cards',
  transactions: 'ct_transactions',
} as const;

@Injectable({ providedIn: 'root' })
export class StorageService {
  getCards(): Card[] {
    try {
      return JSON.parse(localStorage.getItem(KEYS.cards) ?? '[]');
    } catch {
      return [];
    }
  }

  setCards(cards: Card[]): void {
    localStorage.setItem(KEYS.cards, JSON.stringify(cards));
  }

  getTransactions(): Transaction[] {
    try {
      return JSON.parse(localStorage.getItem(KEYS.transactions) ?? '[]');
    } catch {
      return [];
    }
  }

  setTransactions(transactions: Transaction[]): void {
    localStorage.setItem(KEYS.transactions, JSON.stringify(transactions));
  }
}
