import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StoreService } from './services/store/store.service';
import { of } from 'rxjs';
import { Dessert } from './models/dessert';
import { RouterOutlet } from '@angular/router';
import { DessertListComponent } from './components/dessert-list/dessert-list.component';
import { CartComponent } from './components/cart/cart.component';
import { ModalComponent } from './components/modal/modal.component';
import { CommonModule } from '@angular/common';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

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

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let storeService: StoreService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterOutlet,
        DessertListComponent,
        CartComponent,
        ModalComponent,
        CommonModule,
        HttpClientTestingModule,
      ],
      providers: [StoreService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    storeService = TestBed.inject(StoreService);
    httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne('assets/data.json');
    request.flush(mockDesserts);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Desserts');
  });

  it('should correctly display dessert items', () => {
    fixture.detectChanges();

    // wait change detection to complete
    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement as HTMLElement;

      const dessertListComponent = compiled.querySelector('app-dessert-list');
      expect(dessertListComponent).toBeTruthy();

      // Check for the items renders them with a specific class
      const dessertItems =
        dessertListComponent?.querySelectorAll('.dessert-item');
      expect(dessertItems!.length).toBe(2);
    });
  });
});
