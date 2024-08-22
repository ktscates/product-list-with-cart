import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dessert } from './models/dessert';
import { StoreService } from './services/store/store.service';
import { DessertListComponent } from './components/dessert-list/dessert-list.component';
import { CartComponent } from './components/cart/cart.component';
import { ModalComponent } from './components/modal/modal.component';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DessertListComponent,
    CartComponent,
    ModalComponent,
    CommonModule,
  ],
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
