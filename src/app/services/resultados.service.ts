import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResultadosService {
  private apiUrl = 'http://localhost:3000/api/v1/encuestas/';

  constructor(private http: HttpClient) {}

  obtenerResultados(id: number, codigoResultado: string): Observable<any> {
    console.log(id, codigoResultado);
    return this.http.get(
      this.apiUrl + 'resultados/' + id + '?codigo=' + codigoResultado
    );
  }
}
