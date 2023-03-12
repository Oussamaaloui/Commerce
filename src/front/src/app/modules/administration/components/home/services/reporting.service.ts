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

  getRendezVousStatByType(id: string): Observable<SeriesData[]>{
    return this.httpClient.get<any>(this.buildRequestUrlWithOptionalParamId(`${environment.apiUrl}/api/reporting/by-type`, id));
  }

  getRendezVousStatByMotif(id: string): Observable<SeriesData[]>{
    return this.httpClient.get<any>(this.buildRequestUrlWithOptionalParamId(`${environment.apiUrl}/api/reporting/by-motif`, id));
  }

  getRendezVousStatByTypeEntreprise(id: string): Observable<SeriesData[]>{
    return this.httpClient.get<any>(this.buildRequestUrlWithOptionalParamId(`${environment.apiUrl}/api/reporting/by-type-entreprise`, id));
  }

  getRendezVousStatByDayOfWeek(id: string): Observable<SeriesData[]>{
    return this.httpClient.get<any>(this.buildRequestUrlWithOptionalParamId(`${environment.apiUrl}/api/reporting/by-day-of-week`, id));
  }

  getRendezVousStatByMonth(id: string): Observable<SeriesData[]>{
    return this.httpClient.get<any>(this.buildRequestUrlWithOptionalParamId(`${environment.apiUrl}/api/reporting/by-month`, id));
  }

  getSummary(id: string): Observable<Stats>{
    return this.httpClient.get<Stats>(this.buildRequestUrlWithOptionalParamId(`${environment.apiUrl}/api/reporting/summary`, id))
  }

  private buildRequestUrlWithOptionalParamId(url: string, id: string): string{
    if(id && id !== ""){
      return  `${url}?userId=${id}`;
    }else{
      return url;
    }
  }
}
