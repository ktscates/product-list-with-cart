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
  @Input() isModalOpen: boolean = false;
  @Output() addToCart = new EventEmitter<number>();
  @Output() triggerModal = new EventEmitter<void>();
  @Output() startNewOrder = new EventEmitter<void>();

  onAddToModal() {
    if (this.isModalOpen) {
      this.triggerModal.emit();
    } else {
      this.addToCart.emit(this.itemId);
    }
  }

  onStartNewOrder() {
    this.startNewOrder.emit();
  }
}
