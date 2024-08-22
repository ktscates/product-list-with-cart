import { Component, Input } from '@angular/core';
import { StoreService } from '../../services/store/store.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Dessert } from '../../models/dessert';
import { IconsComponent } from '../icons/icons.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, IconsComponent, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  isModalOpen$!: Observable<boolean>;
  cartItems$!: Observable<{ dessert: Dessert; quantity: number }[]>;
  totalCost: number = 0;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.isModalOpen$ = this.storeService.isModalOpen$;
    this.cartItems$ = this.storeService.getCartWithDetails();
  }

  closeModal() {
    this.storeService.closeModal();
  }

  startNewOrder() {
    this.storeService.resetOrder();
  }

  calculateOrderTotal(
    cartItems: { dessert: Dessert; quantity: number }[] | null
  ): number {
    if (!cartItems) {
      return 0;
    }
    return cartItems.reduce(
      (total, item) => total + item.dessert.price * item.quantity,
      0
    );
  }
}
