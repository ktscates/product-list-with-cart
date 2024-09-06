import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '../../services/store/store.service';
import { IconsComponent } from '../icons/icons.component';
import { CartServiceService } from '../../services/cart/cart-service.service';

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
  @Input() productId!: number;
  quantity: number = 0;
  buttonText: string = 'Add to Cart';
  isInCart: boolean = false;

  constructor(
    private storeService: StoreService,
    private cartService: CartServiceService
  ) {}

  ngOnInit() {
    this.cartService.getCart().subscribe((cart) => {
      this.quantity = cart[this.productId] || 0;
      this.isInCart = this.quantity > 0;
    });

    // this.cartService.getCart().subscribe((cart) => {
    //   this.quantity = cart[this.productId] || 0;
    //   this.isInCart = this.quantity > 0;
    // });
  }

  addToCart() {
    if (!this.productId) {
      return;
    }
    this.cartService.addToCart(this.productId);
    this.isInCart = true;
  }

  increment() {
    this.cartService.increment(this.productId);
    this.quantity++;
  }

  decrement() {
    this.cartService.decrement(this.productId);
    this.quantity--;
    if (this.quantity <= 0) {
      this.isInCart = false;
      this.quantity = 0;
    }
  }
}
