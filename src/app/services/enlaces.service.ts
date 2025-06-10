import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Enlaces {
  urlParticipacion: string;
  urlConsulta: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnlacesService {
  constructor(private http: HttpClient) {}

  generarEnlaces(idEncuesta: number, codigoResultado: string, codigoRespuesta: string): Observable<Enlaces> {
      const enlaces: Enlaces = {
        urlParticipacion: `${window.location.origin}/respuestas/${idEncuesta}/${codigoRespuesta}`,
        urlConsulta: `${window.location.origin}/resultados/${idEncuesta}?codigo=${codigoResultado}`,
      };
      return new Observable(observer => {
        observer.next(enlaces);
        observer.complete();
      })
  }

  acortarUrl(url: string): Observable<string> {
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    const tinyUrlApi = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`;
    return this.http.get(corsProxy + tinyUrlApi, { responseType: 'text' });
  }

  async copiarAlPortapapeles(texto: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(texto);
      return true;
    } catch (error) {
      alert('Error al copiar el link ❌');
      return false;
    }
  }
}
