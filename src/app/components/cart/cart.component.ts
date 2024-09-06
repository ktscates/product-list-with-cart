import { Component, OnInit } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { IconsComponent } from '../icons/icons.component';
import { ButtonComponent } from '../button/button.component';
import { StoreService } from '../../services/store/store.service';
import { Observable, map } from 'rxjs';
import { Dessert } from '../../models/dessert';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { CartServiceService } from '../../services/cart/cart-service.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, IconsComponent, ButtonComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<{ product: Product; quantity: number }[]>;
  totalCost$!: Observable<number>;

  constructor(private cartService: CartServiceService) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getCartWithDetails();

    // Calculate the total cost using the observable and map function
    this.totalCost$ = this.cartItems$.pipe(
      map((cartItems) =>
        cartItems.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      )
    );
  }

  confirmOrder(): void {
    this.cartService.openModal();
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}
