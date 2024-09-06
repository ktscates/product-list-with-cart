import { Component, Input } from '@angular/core';
import { StoreService } from '../../services/store/store.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Dessert } from '../../models/dessert';
import { IconsComponent } from '../icons/icons.component';
import { ButtonComponent } from '../button/button.component';
import { Product } from '../../models/product';
import { CartServiceService } from '../../services/cart/cart-service.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, IconsComponent, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  isModalOpen$!: Observable<boolean>;
  cartItems$!: Observable<{ product: Product; quantity: number }[]>;
  totalCost: number = 0;

  constructor(
    private storeService: StoreService,
    private cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    this.isModalOpen$ = this.cartService.isModalOpen$;
    this.cartItems$ = this.cartService.getCartWithDetails();
  }

  closeModal() {
    this.cartService.closeModal();
  }

  startNewOrder() {
    this.cartService.resetOrder();
  }

  calculateOrderTotal(
    cartItems: { product: Product; quantity: number }[] | null
  ): number {
    if (!cartItems) {
      return 0;
    }
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
}
