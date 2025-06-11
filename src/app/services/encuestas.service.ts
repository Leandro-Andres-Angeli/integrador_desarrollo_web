import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CodigoTipoEnum } from '../enums/codigo-tipo.enum';
import { EncuestaDTO } from '../interfaces/encuesta.dto';
import { Observable } from 'rxjs';
import { CrearEncuestaDTO } from '../interfaces/crear-encuesta.dto';

@Injectable({ providedIn: 'root' })
export class EncuestasService {
  private httpClient = inject(HttpClient);

  crearEncuesta(dto: CrearEncuestaDTO): Observable<{
    id: number;
    codigoRespuesta: string;
    codigoResultados: string;
  }> {
    return this.httpClient.post<{
      id: number;
      codigoRespuesta: string;
      codigoResultados: string;
    }>('/api/v1/encuestas', dto);
  }

  traerEncuesta(
    idEncuesta: number,
    codigo: string,
    tipo: CodigoTipoEnum
  ): Observable<EncuestaDTO> {
    return this.httpClient.get<EncuestaDTO>(
      '/api/v1/encuestas/' + idEncuesta + '?codigo=' + codigo + '&tipo=' + tipo
    );
  }

  cambiarEstadoEncuesta(
    idEncuesta: number,
    codigo: string,
    activa: boolean
  ): Observable<{ mensaje: string }> {
    return this.httpClient.patch<{ mensaje: string }>(
      `/api/v1/encuestas/${idEncuesta}/estado?codigo=${codigo}`,
      { activa }
    );
  }
}
