import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconsComponent } from './icons.component';

describe('IconsComponent', () => {
  let component: IconsComponent;
  let fixture: ComponentFixture<IconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept input property iconType', () => {
    component.iconType = 'test-icon';
    fixture.detectChanges();
    expect(component.iconType).toBe('test-icon');
  });
});
