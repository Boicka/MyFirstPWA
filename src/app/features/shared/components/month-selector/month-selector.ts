import { Component, OnInit, inject, signal } from '@angular/core';
import { TransactionService } from '../../../../core/services/transaction.service';

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

@Component({
  selector: 'app-month-selector',
  standalone: true,
  templateUrl: './month-selector.html',
  styleUrl: './month-selector.css',
})
export class MonthSelectorComponent implements OnInit {
  private txService = inject(TransactionService);

  slideClass = signal<'slide-left' | 'slide-right' | ''>('');
  label = signal('');

  ngOnInit(): void {
    this.updateLabel();
  }

  get currentMonth(): string {
    return this.txService.selectedMonth();
  }

  updateLabel(): void {
    const [year, month] = this.currentMonth.split('-').map(Number);
    this.label.set(`${MESES[month - 1]} ${year}`);
  }

  navigate(delta: number): void {
    this.slideClass.set(delta < 0 ? 'slide-right' : 'slide-left');
    const [year, month] = this.currentMonth.split('-').map(Number);
    const date = new Date(year, month - 1 + delta);
    const newMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    this.txService.setSelectedMonth(newMonth);
    this.updateLabel();
    setTimeout(() => this.slideClass.set(''), 350);
  }
}
