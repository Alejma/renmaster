import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Apartament } from '../../../types';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.css'
})
export class EditPopupComponent {
  @Input() display: boolean = false;
  @Output() header!: string;

  @Input() apartment: Apartament = {
    name: '',
    image: '',
    price: '',
    tenant: '',
  };

  @Output() confirm = new EventEmitter<Apartament>();

  onConfirm(){
    this.confirm.emit(this.apartment);
  }

  onCancel(){
    this.display = false;
  }
}
