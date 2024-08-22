import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser'; // For querying elements
import { HttpClientTestingModule } from '@angular/common/http/testing'; // For HttpClient

import { DessertListComponent } from './dessert-list.component';
import { DessertCardComponent } from '../dessert-card/dessert-card.component';
import { Dessert } from '../../models/dessert';

const mockDesserts: Dessert[] = [
  {
    id: '1',
    image: {
      thumbnail: 'thumbnail1',
      mobile: 'mobile1',
      tablet: 'tablet1',
      desktop: 'desktop1',
    },
    name: 'Dessert 1',
    category: 'Cake',
    price: 10,
  },
  {
    id: '2',
    image: {
      thumbnail: 'thumbnail2',
      mobile: 'mobile2',
      tablet: 'tablet2',
      desktop: 'desktop2',
    },
    name: 'Dessert 2',
    category: 'Pie',
    price: 15,
  },
];

describe('DessertListComponent', () => {
  let component: DessertListComponent;
  let fixture: ComponentFixture<DessertListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DessertListComponent,
        DessertCardComponent,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DessertListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of items', () => {
    component.desserts = mockDesserts;
    fixture.detectChanges();

    // Query for dessert cards; update the selector as needed
    const dessertCards = fixture.debugElement.queryAll(
      By.css('app-dessert-card')
    );
    expect(dessertCards.length).toBe(mockDesserts.length);
  });
});
