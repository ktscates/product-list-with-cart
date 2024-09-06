import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  of,
  catchError,
  BehaviorSubject,
  combineLatest,
  map,
} from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  private apiUrl = 'https://fakestoreapi.com/products';
  private products = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.http
      .get<Product[]>(this.apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Error fetching products', error);
          return of([]);
        })
      )
      .subscribe((products) => {
        this.products.next(products);
      });
  }

  getProducts(): Observable<Product[]> {
    return this.products.asObservable();
  }
}
