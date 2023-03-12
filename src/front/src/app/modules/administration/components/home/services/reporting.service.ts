import { Injectable } from '@angular/core';
import {SeriesData} from "../models/series-data.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "src/environments/environment";
import {Stats} from "../models/stats.model";

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  constructor(private httpClient: HttpClient) { }

  getRendezVousStatByType(): Observable<SeriesData[]>{
    return this.httpClient.get<any>(`${environment.apiUrl}/api/reporting/by-type`);
  }

  getRendezVousStatByMotif(): Observable<SeriesData[]>{
    return this.httpClient.get<any>(`${environment.apiUrl}/api/reporting/by-motif`);
  }

  getRendezVousStatByTypeEntreprise(): Observable<SeriesData[]>{
    return this.httpClient.get<any>(`${environment.apiUrl}/api/reporting/by-type-entreprise`);
  }

  getRendezVousStatByDayOfWeek(): Observable<SeriesData[]>{
    return this.httpClient.get<any>(`${environment.apiUrl}/api/reporting/by-day-of-week`);
  }

  getRendezVousStatByMonth(): Observable<SeriesData[]>{
    return this.httpClient.get<any>(`${environment.apiUrl}/api/reporting/by-month`);
  }

  getSummary(): Observable<Stats>{
    return this.httpClient.get<Stats>(`${environment.apiUrl}/api/reporting/summary`)
  }
}
