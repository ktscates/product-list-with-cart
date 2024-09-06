import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Product } from '../../models/product';
import { ProductServiceService } from '../product/product-service.service';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  private cart = new BehaviorSubject<{ [id: string]: number }>({});
  private totalItems = new BehaviorSubject<number>(0);
  private modalOpen = new BehaviorSubject<boolean>(false);

  constructor(private productService: ProductServiceService) {}

  getCart(): Observable<{ [id: string]: number }> {
    return this.cart.asObservable();
  }

  getTotalItems() {
    this.totalItems.asObservable();
  }

  getCartWithDetails(): Observable<{ product: Product; quantity: number }[]> {
    return combineLatest([
      this.cart.asObservable(),
      this.productService.getProducts(),
    ]).pipe(
      map(([cart, products]) => {
        return Object.keys(cart)
          .map((id) => {
            const product = products.find(
              (prod: Product) => prod.id === parseInt(id)
            );
            return product ? { product, quantity: cart[id] } : null;
          })
          .filter((item) => item !== null) as {
          product: Product;
          quantity: number;
        }[];
      })
    );
  }

  addToCart(productId: number) {
    const currentCart = this.cart.value;
    currentCart[productId] = (currentCart[productId] || 0) + 1;
    this.cart.next(currentCart);
    this.updateTotalItems();
  }

  removeFromCart(productId: number) {
    const currentCart = this.cart.value;
    if (currentCart[productId]) {
      delete currentCart[productId];
      this.cart.next(currentCart);
      this.updateTotalItems();
    }
  }

  increment(productId: number): void {
    const currentCart = this.cart.value;
    if (currentCart[productId]) {
      currentCart[productId]++;
      this.cart.next(currentCart);
    }
  }

  decrement(productId: number): void {
    const currentCart = this.cart.value;
    if (currentCart[productId] > 1) {
      currentCart[productId]--;
    } else {
      delete currentCart[productId];
    }
    this.cart.next(currentCart);
  }

  clearCart() {
    this.cart.next({});
    this.updateTotalItems();
  }

  private updateTotalItems() {
    const total = Object.values(this.cart.value).reduce(
      (sum, quantity) => sum + quantity,
      0
    );
    this.totalItems.next(total);
  }

  isModalOpen$ = this.modalOpen.asObservable();

  openModal(): void {
    this.modalOpen.next(true);
  }

  closeModal(): void {
    this.modalOpen.next(false);
  }

  resetOrder(): void {
    this.cart.next({});
    this.closeModal();
  }
}
