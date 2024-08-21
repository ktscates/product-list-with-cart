import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '../../services/store/store.service';
import { IconsComponent } from '../icons/icons.component';

@Component({
  selector: 'app-button-cart',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './button-cart.component.html',
  styleUrls: ['./button-cart.component.css'],
})
export class ButtonCartComponent implements OnInit {
  @Input() dessertId!: string;
  @Input() unitPrice!: number;
  quantity: number = 0;
  buttonText: string = 'Add to Cart';
  isInCart: boolean = false;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    console.log('Dessert ID in ButtonCartComponent:', this.dessertId);
    this.storeService.getCart().subscribe((cart) => {
      console.log('Cart in ButtonCartComponent:', cart);
      this.quantity = cart[this.dessertId] || 0;
      this.isInCart = this.quantity > 0;
    });
  }

  addToCart() {
    if (!this.dessertId) {
      console.error('No dessertId provided');
      return;
    }
    this.storeService.addToCart(this.dessertId);
    this.isInCart = true;
    this.quantity++;
  }

  increment() {
    this.storeService.increment(this.dessertId);
    this.quantity++;
  }

  decrement() {
    this.storeService.decrement(this.dessertId);
    this.quantity--;
    if (this.quantity <= 0) {
      this.isInCart = false;
      this.quantity = 0;
    }
  }
}
