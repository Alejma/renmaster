import { Component } from '@angular/core';
import { ApartamentsService } from '../services/apartaments.service';
import { Apartament, Apartaments } from '../../types';
import { ApartamentComponent } from '../component/apartament/apartament.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from "../component/edit-popup/edit-popup.component";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ApartamentComponent, CommonModule, PaginatorModule, EditPopupComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private apartamentsService: ApartamentsService
  ){}

  apartments: Apartament[] = [];

  totalRecords: number = 0;
  rows: number = 5;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  toggleEditPopup(apartment: Apartament){
    this.selectedApartment = apartment;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(apartament: Apartament){
    
  }

  toggleAddPopup(){
    this.displayAddPopup = true;
  }

  selectedApartment: Apartament = {
    id: 0,
    name: '',
    image: '',
    price: '',
    tenant: '',
  };

  onConfirmEdit(apartment: Apartament){
    if (!this.selectedApartment.id) {
      return;
    }
    this.editApartment(apartment, this.selectedApartment.id);
    this.displayEditPopup = false;
  }

  onConfirmAdd(apartment: Apartament){
    this.addApartment(apartment);
    this.displayAddPopup = false;
  }

  onApartmentOutput(apartment: Apartament){
    console.log(apartment, 'Output');
  }

  onPageCHange(event: any){
    this.fetchApartments(event.page, event.rows);
  }

  fetchApartments(page: number, perPage: number){
    this.apartamentsService.getApartments('http://localhost:3000/apartments', { page, perPage})
    .subscribe({
      next: (data: Apartaments) => {
      this.apartments = data.items;
      this.totalRecords = data.total;
    },
    error: (error) => {
      console.log(error);
    },
    });
  }

  editApartment(apartment: Apartament, id: number){
    this.apartamentsService.editApartment(`http://localhost:3000/apartments/${id}`, apartment).subscribe(
    {
      next: (data) => {
        console.log(data);
        this.fetchApartments(0, this.rows);
      },
      error: (error) => {
        console.log(error);
      }
    }
    );
  }

  deleteApartment(id: number){
    this.apartamentsService.deleteApartment(`http://localhost:3000/apartments/${id}`).subscribe(
    {
      next: (data) => {
        console.log(data);
        this.fetchApartments(0, this.rows);
      },
      error: (error) => {
        console.log(error);
      }
    }
    );
  }

  addApartment(apartment: Apartament){
    this.apartamentsService.addApartment('http://localhost:3000/apartments', apartment).subscribe(
    {
      next: (data) => {
        console.log(data);
        this.fetchApartments(0, this.rows);
      },
      error: (error) => {
        console.log(error);
      }
    }
    );
  }

  ngOnInit(){
    this.fetchApartments(0, this.rows);
  }
}
