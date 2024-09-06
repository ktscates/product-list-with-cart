import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '../../services/store/store.service';
import { Dessert } from '../../models/dessert';
import { DessertCardComponent } from '../dessert-card/dessert-card.component';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { ProductServiceService } from '../../services/product/product-service.service';
import { CartServiceService } from '../../services/cart/cart-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dessert-list',
  standalone: true,
  imports: [DessertCardComponent, CommonModule],
  templateUrl: './dessert-list.component.html',
  styleUrl: './dessert-list.component.css',
})
export class DessertListComponent implements OnInit {
  products$ = this.productService.getProducts();

  constructor(
    private productService: ProductServiceService,
    private cartService: CartServiceService
  ) {}

  addToCart(productId: number) {
    this.cartService.addToCart(productId);
  }

  ngOnInit(): void {}
}
