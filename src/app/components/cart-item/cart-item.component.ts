import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, IconsComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  @Input() itemName!: string;
  @Input() quantity!: number;
  @Input() unitPrice!: number;
  @Output() removeItem = new EventEmitter<void>();

  get totalPrice(): number {
    return this.quantity * this.unitPrice;
  }

  onRemoveItem() {
    this.removeItem.emit();
  }
}
