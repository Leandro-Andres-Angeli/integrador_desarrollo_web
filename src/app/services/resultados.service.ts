import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultadosDto } from '../interfaces/resultados.dto';
import { environment } from '../../environments/environment';
export interface PaginationResult<T> {
  data: T
  next: boolean;
  prev: boolean
}@Injectable({
  providedIn: 'root',
})
export class ResultadosService {
  private apiUrl = `${environment.apiUrl}/encuestas/`;

  constructor(private http: HttpClient) { }

  obtenerResultados(
    id: number,
    codigoResultado: string,
    page = 1): Observable<PaginationResult<ResultadosDto>> {
    console.log(id, codigoResultado);
    return this.http.get<PaginationResult<ResultadosDto>>(
      this.apiUrl + 'resultados/' + id + '?codigo=' + codigoResultado + "&page=" + page
    );
  }

  descargarCSV(id: number, codigoResultado: string, titulo: string) {
    this.http
      .get(
        this.apiUrl + 'resultados/' + id + '/csv?codigo=' + codigoResultado,
        { responseType: 'blob' }
      )
      .subscribe((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          'questi_' + this.sanitizeFilename(titulo) + '.csv'
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  sanitizeFilename(name: string): string {
    return name.replace(/[\/\\:*?"<>|]/g, '');
  }
}
