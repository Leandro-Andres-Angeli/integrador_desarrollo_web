import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { EncuestaDTO } from '../interfaces/encuesta.dto';
import { CrearRespuestaDTO } from '../interfaces/crear-respuesta.dto';

@Injectable({
  providedIn: 'root',
})
export class RespuestasService {

  constructor(private http: HttpClient) {}

  
  getEncuesta(id: number, codigoRespuesta: string): Observable<EncuestaDTO> {
    if (!id || !codigoRespuesta) {
      return throwError(() => new Error('ID y códigos son requeridos'));
    }

    const params = new HttpParams()
    .set('codigo', codigoRespuesta)
    .set('tipo', 'RESPUESTA');

    return this.http.get<EncuestaDTO>(
      `/api/v1/encuestas/${id}`,
      { params }
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error completo: ', error);
    let errorMessage = 'Ocurrió un error en la solicitud';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }

  enviarRespuestas(idEncuesta: number, codigoRespuesta: string, respuestas: CrearRespuestaDTO): Observable<{ mensaje: string }> {
    console.log('Enviando al backend: ')
    return this.http.post<{ mensaje: string }>(
      `/api/v1/respuestas/${idEncuesta}`,
      respuestas,
      { params: new HttpParams().set('codigo', codigoRespuesta) } 
    ).pipe(
      catchError(this.handleError)
    );
  }
}