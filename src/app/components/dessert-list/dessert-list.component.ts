import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '../../services/store/store.service';
import { Dessert } from '../../models/dessert';
import { DessertCardComponent } from '../dessert-card/dessert-card.component';

@Component({
  selector: 'app-dessert-list',
  standalone: true,
  imports: [DessertCardComponent],
  templateUrl: './dessert-list.component.html',
  styleUrl: './dessert-list.component.css',
})
export class DessertListComponent {
  @Input() desserts: Dessert[] = [];
}
