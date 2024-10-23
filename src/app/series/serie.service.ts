import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Serie } from './serie';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  private apiUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  getSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.apiUrl);
  }

  getAverageSeasons(): Observable<number> {
    return this.getSeries().pipe(
      map(series => {
        if (series.length === 0) return 0;
        const totalSeasons = series.reduce((sum, serie) => sum + serie.seasons, 0);
        return totalSeasons / series.length;
      })
    );
  }
}
