import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Obtener encuestas
  getEncuestas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/encuesta`);
  }

  // Crear respuesta
  createRespuesta(encuestaId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/respuesta`, { encuestaId });
  }

  // Guardar respuesta de opción
  saveOpcionRespuesta(respuestaId: number, opcionId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/opcion-respuesta`, { respuestaId, opcionId });
  }
}
