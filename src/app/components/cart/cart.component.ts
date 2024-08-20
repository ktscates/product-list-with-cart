import { Component } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { IconsComponent } from '../icons/icons.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, IconsComponent, ButtonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class OrderCardComponent {}
