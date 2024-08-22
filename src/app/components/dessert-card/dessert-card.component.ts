import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonCartComponent } from '../button-cart/button-cart.component';

@Component({
  selector: 'app-dessert-card',
  standalone: true,
  imports: [CommonModule, ButtonCartComponent],
  templateUrl: './dessert-card.component.html',
  styleUrl: './dessert-card.component.css',
})
export class DessertCardComponent {
  @Input() id!: string;
  @Input() imageUrl!: string;
  @Input() category!: string;
  @Input() name!: string;
  @Input() price!: number;
}
