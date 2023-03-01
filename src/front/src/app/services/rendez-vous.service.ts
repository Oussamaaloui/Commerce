import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from '../helpers/globals';
import { RendezVous } from '../models/rendez-vous.model';

const API_URL = `${Globals.BASE_URL}/api/rendez-vous/`


@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  constructor(private http: HttpClient) { }

  test(){
    return Globals.BASE_URL
  }

  create(rdv: RendezVous){
    return this.http.put<any>(API_URL, rdv);
  }

  update(rdv: RendezVous){
    return this.http.post<any>(`${API_URL}/${rdv.id}`, rdv)
  }

  updateTiming(id: string, start: Date, end:Date){
    return this.http.post<any>(`${API_URL}update-timing/${id}`, {
      start: start,
      end: end
    })
  }

  delete(id: string){
    return this.http.delete<any>(`${API_URL}${id}`)
  }

  getAll(): Observable<RendezVous[]>{
    return this.http.get<RendezVous[]>(API_URL)
  }

  getById(id: string): Observable<RendezVous>{
    return this.http.get<RendezVous>(`${API_URL}/${id}`)
  }
}
