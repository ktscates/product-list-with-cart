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

  constructor(private http: HttpClient) {
    this.loadDesserts(); // Load desserts on initialization
  }

  private loadDesserts(): void {
    this.http
      .get<Dessert[]>(this.dataUrl)
      .pipe(
        catchError((error) => {
          console.error('Error fetching desserts', error);
          return of([]); // Return an empty array in case of error
        })
      )
      .subscribe((desserts) => {
        console.log('Desserts loaded:', desserts); // Check if desserts are loaded correctly
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
        console.log('Cart:', cart); // Check cart data
        console.log('Desserts:', desserts); // Check desserts data
        return Object.keys(cart)
          .map((id) => {
            const dessert = desserts.find((d) => d.id === id);
            console.log('Finding dessert for ID:', id, dessert); // Check each found dessert
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
      console.error('Invalid dessertId:', dessertId);
      return;
    }
    const currentCart = this.cart.value;
    currentCart[dessertId] = (currentCart[dessertId] || 0) + 1;
    this.cart.next(currentCart);
    console.log('Cart after add:', currentCart);
  }

  increment(dessertId: string): void {
    const currentCart = this.cart.value;
    if (currentCart[dessertId]) {
      currentCart[dessertId]++;
      this.cart.next(currentCart);
      console.log('Cart updated after increment:', this.cart.value);
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
    console.log('Cart updated after decrement:', this.cart.value);
  }
}
