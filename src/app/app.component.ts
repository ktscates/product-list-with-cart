import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dessert } from './models/dessert';
import { StoreService } from './services/store/store.service';
import { DessertCardComponent } from './components/dessert-card/dessert-card.component';
import { DessertListComponent } from './components/dessert-list/dessert-list.component';
import { OrderCardComponent } from './components/cart/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DessertListComponent, OrderCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'product-list-with-cart';
  desserts: Dessert[] = [];

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getDesserts().subscribe((data) => {
      this.desserts = data;
    });
  }
}
