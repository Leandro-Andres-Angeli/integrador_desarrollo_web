import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { EncuestasService } from './encuestas.service';

interface Enlaces {
  urlParticipacion: string;
  urlConsulta: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnlacesService {
  private readonly urlCorta = window.location.origin;

  constructor(private encuestasService: EncuestasService) {}

  generarEnlaces(idEncuesta: number, codigoResultado: string, codigoRespuesta: string): Observable<Enlaces> {
    return new Observable<Enlaces>(observer => {
      const enlaces: Enlaces = {
        urlParticipacion: `${window.location.origin}/respuestas/${idEncuesta}/${codigoRespuesta}`,
        urlConsulta: `${window.location.origin}/resultados/${idEncuesta}/${codigoResultado}`        
      };
      observer.next(enlaces);
      observer.complete();
    });
  }

  generarEnlacesCortos(idEncuesta: number): Enlaces {
    return {
      urlParticipacion: `${this.urlCorta}/encuesta/${idEncuesta}`,
      urlConsulta: `${this.urlCorta}/resultados/${idEncuesta}`
    };
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
