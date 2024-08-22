import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  BehaviorSubject,
  catchError,
  of,
  map,
  combineLatest,
} from 'rxjs';
import { Dessert } from '../../models/dessert';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private dataUrl = 'assets/data.json';
  private cart = new BehaviorSubject<{ [id: string]: number }>({});
  private desserts = new BehaviorSubject<Dessert[]>([]);
  private modalOpen = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.loadDesserts();
  }

  private loadDesserts(): void {
    this.http
      .get<Dessert[]>(this.dataUrl)
      .pipe(catchError(() => of([])))
      .subscribe((desserts) => {
        this.desserts.next(desserts);
      });
  }

  getDesserts(): Observable<Dessert[]> {
    return this.desserts.asObservable();
  }

  getCart(): Observable<{ [id: string]: number }> {
    return this.cart.asObservable();
  }

  getCartWithDetails(): Observable<{ dessert: Dessert; quantity: number }[]> {
    return combineLatest([
      this.cart.asObservable(),
      this.desserts.asObservable(),
    ]).pipe(
      map(([cart, desserts]) => {
        return Object.keys(cart)
          .map((id) => {
            const dessert = desserts.find((d) => d.id === id);
            return dessert ? { dessert, quantity: cart[id] } : null;
          })
          .filter((item) => item !== null) as {
          dessert: Dessert;
          quantity: number;
        }[];
      })
    );
  }

  addToCart(dessertId: string): void {
    if (!dessertId) {
      return;
    }
    const currentCart = this.cart.value;
    currentCart[dessertId] = (currentCart[dessertId] || 0) + 1;
    this.cart.next(currentCart);
  }

  increment(dessertId: string): void {
    const currentCart = this.cart.value;
    if (currentCart[dessertId]) {
      currentCart[dessertId]++;
      this.cart.next(currentCart);
    }
  }

  decrement(dessertId: string): void {
    const currentCart = this.cart.value;
    if (currentCart[dessertId] > 1) {
      currentCart[dessertId]--;
    } else {
      delete currentCart[dessertId];
    }
    this.cart.next(currentCart);
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

  removeFromCart(dessertId: string): void {
    const currentCart = this.cart.value;
    if (currentCart[dessertId]) {
      delete currentCart[dessertId];
      this.cart.next(currentCart);
    }
  }
}
