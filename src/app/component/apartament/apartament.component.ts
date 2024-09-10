import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Apartament } from '../../../types';
import { FormsModule } from '@angular/forms'; 
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-apartament',
  standalone: true,
  imports: [FormsModule, ButtonModule],
  templateUrl: './apartament.component.html',
  styleUrl: './apartament.component.css'
})
export class ApartamentComponent {
  @Input() apartament!: Apartament;
  @Output() edit: EventEmitter<Apartament> =  new EventEmitter<Apartament>();
  @Output() delete: EventEmitter<Apartament> =  new EventEmitter<Apartament>();

  editApartment(){
    this.edit.emit(this.apartament);
  }

  deleteApartment(){
    this.delete.emit(this.apartament);
  }

  ngOnInit(){
    
  }
}
