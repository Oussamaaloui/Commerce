import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Entreprise} from "../models/entreprise.model";
const API_URL = `${environment.apiUrl}/api/entreprises`
@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  constructor(private http: HttpClient) { }

  create(rdv: Entreprise){
    return this.http.put<any>(API_URL, rdv);
  }

  update(entreprise: Entreprise){
    return this.http.post<any>(`${API_URL}/${entreprise.id}`, entreprise)
  }

  delete(id: number){
    return this.http.delete<any>(`${API_URL}/${id}`)
  }

  getAll(): Observable<Entreprise[]>{
    return this.http.get<Entreprise[]>(API_URL)
  }

  getById(id: number): Observable<Entreprise>{
    return this.http.get<Entreprise>(`${API_URL}/${id}`)
  }
}
