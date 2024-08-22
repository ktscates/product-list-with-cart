import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { StoreService } from './store.service';
import { Dessert } from '../../models/dessert';

// Mock HttpClient
class MockHttpClient {
  get = jest.fn();
}

describe('StoreService', () => {
  let service: StoreService;
  let httpClient: MockHttpClient;

  beforeEach(() => {
    httpClient = new MockHttpClient();
    httpClient.get = jest.fn().mockReturnValue(of([])); // Mock successful HTTP GET

    TestBed.configureTestingModule({
      providers: [StoreService, { provide: HttpClient, useValue: httpClient }],
    });
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call loadDesserts on initialization', () => {
    expect(httpClient.get).toHaveBeenCalledWith('assets/data.json');
  });

  it('should handle HTTP error', () => {
    httpClient.get = jest
      .fn()
      .mockReturnValue(throwError(() => new Error('Failed to load')));
    service = TestBed.inject(StoreService);

    service.getDesserts().subscribe((desserts) => {
      expect(desserts).toEqual([]);
    });
  });

  it('should add a dessert to the cart', () => {
    const dessertId = '1';
    service.addToCart(dessertId);
    service.getCart().subscribe((cart) => {
      expect(cart[dessertId]).toBe(1);
    });
  });

  it('should not add to cart if dessertId is invalid', () => {
    service.addToCart('');
    service.getCart().subscribe((cart) => {
      expect(Object.keys(cart).length).toBe(0);
    });
  });

  it('should increment the quantity of a dessert in the cart', () => {
    const dessertId = '1';
    service.addToCart(dessertId);
    service.increment(dessertId);
    service.getCart().subscribe((cart) => {
      expect(cart[dessertId]).toBe(2);
    });
  });

  it('should not increment if dessert is not in the cart', () => {
    const dessertId = '1';
    service.increment(dessertId);
    service.getCart().subscribe((cart) => {
      expect(cart[dessertId]).toBeUndefined();
    });
  });

  it('should decrement the quantity of a dessert in the cart', () => {
    const dessertId = '1';
    service.addToCart(dessertId);
    service.increment(dessertId); // quantity should be 2 now
    service.decrement(dessertId);
    service.getCart().subscribe((cart) => {
      expect(cart[dessertId]).toBe(1);
    });
  });

  it('should remove a dessert from the cart', () => {
    const dessertId = '1';
    service.addToCart(dessertId);
    service.removeFromCart(dessertId);
    service.getCart().subscribe((cart) => {
      expect(cart[dessertId]).toBeUndefined();
    });
  });

  it('should handle removeFromCart when dessert is not in cart', () => {
    const dessertId = '1';
    service.removeFromCart(dessertId);
    service.getCart().subscribe((cart) => {
      expect(cart[dessertId]).toBeUndefined();
    });
  });

  it('should open and close the modal', () => {
    service.openModal();
    service.isModalOpen$.subscribe((isOpen) => {
      expect(isOpen).toBe(true);
    });

    service.closeModal();
    service.isModalOpen$.subscribe((isOpen) => {
      expect(isOpen).toBe(false);
    });
  });

  it('should reset the cart and close the modal', () => {
    const dessertId = '1';
    service.addToCart(dessertId);
    service.resetOrder();
    service.getCart().subscribe((cart) => {
      expect(cart).toEqual({});
    });
    service.isModalOpen$.subscribe((isOpen) => {
      expect(isOpen).toBe(false);
    });
  });

  it('should get cart with details', () => {
    const dessert: Dessert = {
      id: '1',
      name: 'Cake',
      category: 'Sweet',
      price: 10,
      image: {
        thumbnail: 'thumbnail1',
        mobile: 'mobile1',
        tablet: 'tablet1',
        desktop: 'desktop1',
      },
    };
    service.getDesserts = jest.fn().mockReturnValue(of([dessert]));
    service.addToCart('1');
    service.getCartWithDetails().subscribe((cartWithDetails) => {
      expect(cartWithDetails).toEqual([{ dessert, quantity: 1 }]);
    });
  });
});
