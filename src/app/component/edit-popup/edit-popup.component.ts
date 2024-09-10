import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Apartament } from '../../../types';
import { FormBuilder, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule, ButtonModule, ReactiveFormsModule,],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.css'
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder) {}

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  @Input() header!: string;

  @Input() apartment: Apartament = {
    name: '',
    image: '',
    price: '',
    tenant: '',
  };

  @Output() confirm = new EventEmitter<Apartament>();

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(control.value);
      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
  };
  }

  // Da un error porque formBuilder no esta definido correctamente
/*   apartmentForm = this.formBuilder.group({
    name: ['', [Validators.required, this.specialCharacterValidator]],
    image: [''],
    price: [''],
    tenant: [''],
   }); */

/*    ngOnInit(){
      this.apartmentForm.patchValue(this.apartment);
    } */

  onConfirm(){
    this.confirm.emit(this.apartment);
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel(){
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
