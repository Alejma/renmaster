import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Apartaments, PaginationParams } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ApartamentsService {

  constructor(private apiService: ApiService) { }

  getApartments = (Url: string, params: PaginationParams): Observable<Apartaments>  => {
    return this.apiService.get(Url, {
      params,
      responseType: 'json',
    });
  };
  
  addApartment = (Url: string, body: any): Observable<any> => {
    return this.apiService.post(Url, body, {});
  };

  editApartment = (Url: string, body: any): Observable<any> => {
    return this.apiService.put(Url, body, {});
  };

  deleteApartment = (Url: string): Observable<any> => {
    return this.apiService.delete(Url, {});
  };
}
