import { Component } from '@angular/core';
import { StoreService } from '../../services/store/store.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  isModalOpen$!: Observable<boolean>;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.isModalOpen$ = this.storeService.isModalOpen$;
  }

  closeModal() {
    this.storeService.closeModal();
  }
}
