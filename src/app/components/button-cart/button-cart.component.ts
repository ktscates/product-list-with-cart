import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';

@Component({
  selector: 'app-button-cart',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './button-cart.component.html',
  styleUrl: './button-cart.component.css',
})
export class ButtonCartComponent {
  @Input() itemId!: number;
  @Input() buttonText: string = 'Add to Cart';
  @Output() addToCart = new EventEmitter<number>();

  onAddToCart() {
    this.addToCart.emit(this.itemId);
  }
}
