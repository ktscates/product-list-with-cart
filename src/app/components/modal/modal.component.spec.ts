import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ModalComponent } from './modal.component';
import { StoreService } from '../../services/store/store.service';
import { Dessert } from '../../models/dessert';
import { IconsComponent } from '../icons/icons.component';
import { ButtonComponent } from '../button/button.component';

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

const mockCartItems = [
  { dessert: mockDesserts[0], quantity: 2 },
  { dessert: mockDesserts[1], quantity: 1 },
];

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let storeService: StoreService;

  beforeEach(async () => {
    const storeServiceMock = {
      isModalOpen$: of(true),
      getCartWithDetails: () => of(mockCartItems),
      closeModal: jest.fn(),
      resetOrder: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ModalComponent, IconsComponent, ButtonComponent],
      providers: [{ provide: StoreService, useValue: storeServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    storeService = TestBed.inject(StoreService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isModelOpen$ & cartItems$ correctly', () => {
    component.isModalOpen$.subscribe((isOpen) => {
      expect(isOpen).toBe(true);
    });
    component.cartItems$.subscribe((cartItems) => {
      expect(cartItems).toEqual(mockCartItems);
    });
  });

  it('should calculate order total correctly', () => {
    const total = component.calculateOrderTotal(mockCartItems);
    expect(total).toBe(35); // (10*2) + (15*1)
  });

  it('should call closeModal', () => {
    component.closeModal();
    expect(storeService.closeModal).toHaveBeenCalled();
  });

  it('should call startNewOrder', () => {
    component.startNewOrder();
    expect(storeService.resetOrder).toHaveBeenCalled();
  });
});
