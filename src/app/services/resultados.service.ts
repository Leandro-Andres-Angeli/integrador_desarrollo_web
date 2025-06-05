import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultadosDto } from '../interfaces/resultados.dto';

@Injectable({
  providedIn: 'root',
})
export class ResultadosService {
  private apiUrl = 'http://localhost:3000/api/v1/encuestas/';

  constructor(private http: HttpClient) {}

  obtenerResultados(
    id: number,
    codigoResultado: string
  ): Observable<ResultadosDto> {
    console.log(id, codigoResultado);
    return this.http.get<ResultadosDto>(
      this.apiUrl + 'resultados/' + id + '?codigo=' + codigoResultado
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
