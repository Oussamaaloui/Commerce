import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Interlocuteur} from "../models/interlocuteur.model";
const API_URL = `${environment.apiUrl}/api/interlocuteurs`;

@Injectable({
  providedIn: 'root'
})
export class InterlocuteurService {

  constructor(private http: HttpClient) { }

  create(item: Interlocuteur){
    return this.http.put<any>(API_URL, item);
  }

  update(item: Interlocuteur){
    return this.http.post<any>(`${API_URL}/${item.id}`, item)
  }

  delete(id: number){
    return this.http.delete<any>(`${API_URL}/${id}`)
  }

  getAll(): Observable<Interlocuteur[]>{
    return this.http.get<Interlocuteur[]>(API_URL)
  }

  getById(id: number): Observable<Interlocuteur>{
    return this.http.get<Interlocuteur>(`${API_URL}/${id}`)
  }

  getByEntreprise(id: number): Observable<Interlocuteur[]>{
    return this.http.get<Interlocuteur[]>(`${API_URL}/by-entreprise/${id}`)
  }
}
