import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addToCart with itemId', () => {
    const itemId = 1;
    component.itemId = itemId;
    component.isModalOpen = false;
    const addToCartSpy = jest.spyOn(component.addToCart, 'emit');
    component.onAddToModal();
    expect(addToCartSpy).toHaveBeenCalledWith(itemId);
  });

  it('should emit triggerModal', () => {
    component.isModalOpen = true;
    const triggerModalSpy = jest.spyOn(component.triggerModal, 'emit');
    component.onAddToModal();
    expect(triggerModalSpy).toHaveBeenCalled();
  });

  it('should emit startNewOrder', () => {
    const startNewOrderSpy = jest.spyOn(component.startNewOrder, 'emit');
    component.onStartNewOrder();
    expect(startNewOrderSpy).toHaveBeenCalled();
  });
});
