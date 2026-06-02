import { Component, input } from '@angular/core';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CurrencyFormatPipe],
  templateUrl: './summary-card.html',
  styleUrl: './summary-card.css',
})
export class SummaryCardComponent {
  label = input.required<string>();
  amount = input.required<number>();
  icon = input.required<string>();
  variant = input<'balance' | 'ingreso' | 'gasto'>('balance');
}
