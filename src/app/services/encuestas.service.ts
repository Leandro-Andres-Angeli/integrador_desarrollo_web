import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EncuestasService {
  private readonly apiUrl = 'http://localhost:3000/api/v1/encuestas'; 
  private refrescarTablaSubject = new Subject<void>();

  refrescarTabla$ = this.refrescarTablaSubject.asObservable();

  constructor(private http: HttpClient) {}

  crearEncuesta(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  crearPregunta(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/v1/preguntas', data);
  }

  getEncuestas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  notificarRefresco() {
    this.refrescarTablaSubject.next();
  }
}
