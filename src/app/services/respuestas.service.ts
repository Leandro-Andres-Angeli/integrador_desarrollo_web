import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateRespuestaDTO } from '../interfaces/create-respuesta.dto';

@Injectable({
  providedIn: 'root',
})
export class RespuestasService {
  private apiUrl = `${environment.apiUrl}/respuestas`;

  constructor(private http: HttpClient) {}

  enviarRespuestas(idEncuesta: number, dto: CreateRespuestaDTO): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(`${this.apiUrl}/${idEncuesta}`, dto);
  }
}