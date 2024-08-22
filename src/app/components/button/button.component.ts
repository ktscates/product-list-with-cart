import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() itemId!: number;
  @Input() buttonText: string = 'Confirm the order';
  @Output() addToCart = new EventEmitter<number>();

  onAddToModal() {
    this.addToCart.emit(this.itemId);
  }
}
