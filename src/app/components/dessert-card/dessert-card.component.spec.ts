import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DessertCardComponent } from './dessert-card.component';

describe('DessertCardComponent', () => {
  let component: DessertCardComponent;
  let fixture: ComponentFixture<DessertCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule, DessertCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DessertCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
