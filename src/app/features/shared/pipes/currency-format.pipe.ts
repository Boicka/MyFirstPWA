import { Pipe, PipeTransform } from '@angular/core';

const formatter = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

@Pipe({ name: 'currencyFormat', pure: true, standalone: true })
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number): string {
    return formatter.format(value);
  }
}
