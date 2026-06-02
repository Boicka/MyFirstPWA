import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fab',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './fab.html',
  styleUrl: './fab.css',
})
export class FabComponent {
  icon = input<string>('add');
  link = input.required<string>();
}
