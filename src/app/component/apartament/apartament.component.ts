import { Component, EventEmitter, Input, Output, ViewChild, viewChild } from '@angular/core';
import { Apartament } from '../../../types';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-apartament',
  standalone: true,
  imports: [FormsModule, ButtonModule, ConfirmPopupModule, ToastModule, ReactiveFormsModule],
  providers: [ConfirmationService],
  templateUrl: './apartament.component.html',
  styleUrl: './apartament.component.css'
})
export class ApartamentComponent {
  constructor(private confirmationService: ConfirmationService) {}

  @ViewChild('deleteButton') deleteButton: any;

  @Input() apartament!: Apartament;
  @Output() edit: EventEmitter<Apartament> =  new EventEmitter<Apartament>();
  @Output() delete: EventEmitter<Apartament> =  new EventEmitter<Apartament>();

  editApartment(){
    this.edit.emit(this.apartament);
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
        message: 'Are you sure that you want to delete this apartment?',
        accept: () => {
            this.deleteApartment();
        },
    });
  }

  deleteApartment(){
    this.delete.emit(this.apartament);
  }

  ngOnInit(){
    
  }
}
