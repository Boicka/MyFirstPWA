import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialogComponent {
  message = input.required<string>();
  confirmLabel = input<string>('Eliminar');

  confirmed = output<void>();
  cancelled = output<void>();

  closing = signal(false);

  private close(emit: () => void): void {
    this.closing.set(true);
    setTimeout(() => emit(), 250);
  }

  onConfirm(): void {
    this.close(() => this.confirmed.emit());
  }

  onCancel(): void {
    this.close(() => this.cancelled.emit());
  }
}
