import { Component, OnInit } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { IconsComponent } from '../icons/icons.component';
import { ButtonComponent } from '../button/button.component';
import { StoreService } from '../../services/store/store.service';
import { Observable } from 'rxjs';
import { Dessert } from '../../models/dessert';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, IconsComponent, ButtonComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: { dessert: Dessert; quantity: number }[] = [];
  totalCost: number = 0;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getCartWithDetails().subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.calculateTotalCost();
    });
  }

  private calculateTotalCost(): void {
    this.totalCost = this.cartItems.reduce(
      (total, item) => total + item.dessert.price * item.quantity,
      0
    );
  }

  confirmOrder(): void {
    this.storeService.openModal();
  }

  removeItem(dessertId: string) {
    this.storeService.removeFromCart(dessertId);
  }
}
