import { Component, input } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { Card } from '../../../../core/models/card.model';

@Component({
  selector: 'app-credit-card-visual',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './credit-card-visual.html',
  styleUrl: './credit-card-visual.css',
})
export class CreditCardVisualComponent {
  card = input.required<Card>();
  isActive = input<boolean>(false);
}
