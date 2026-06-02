import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.css',
})
export class BottomNavComponent {
  tabs = [
    { path: '/inicio',       icon: 'home',          label: 'Inicio' },
    { path: '/movimientos',  icon: 'receipt_long',  label: 'Movimientos' },
    { path: '/tarjetas',     icon: 'credit_card',   label: 'Tarjetas' },
  ];
}
