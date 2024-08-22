import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartItemComponent } from '../cart-item/cart-item.component';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total price correctly', () => {
    component.unitPrice = 10;
    component.quantity = 2;
    expect(component.totalPrice).toBe(20);
  });

  it('should emit removeItem event when removeItem method is called', () => {
    jest.spyOn(component.removeItem, 'emit');
    component.onRemoveItem();
    expect(component.removeItem.emit).toHaveBeenCalled();
  });
});
