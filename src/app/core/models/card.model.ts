export type CardNetwork = 'visa' | 'mastercard' | 'amex' | 'other';
export type CardType = 'credito' | 'debito';

export interface Card {
  id: string;
  name: string;
  lastFour: string;
  network: CardNetwork;
  type: CardType;
  color: string;
  createdAt: string;
}
