import { OpcionDTO } from './opcion.dto';
import { CloudData } from 'angular-tag-cloud-module';

export interface RespuestaOpcionGraficosDto {
  id: number;
  opcionId: number;
  cantidad: number;
}

export interface RespuestaVerdaderoFalsoGraficosDto {
  id: number;
  valor: boolean;
  cantidad: number;
}

interface RespuestaAbiertaDto {
  id: number;
  texto: string;
}

export interface PreguntaResultadoGraficosDto {
  id: number;
  numero: number;
  texto: string;
  tipo: string;
  opciones: OpcionDTO[];
  respuestasOpciones: RespuestaOpcionGraficosDto[];
  respuestasAbiertas: RespuestaAbiertaDto[];
  respuestasVF: RespuestaVerdaderoFalsoGraficosDto[];
  frecuenciaPalabras: CloudData[];
}

export interface RespuestasDto {
  preguntaId: number;
  textoRespuesta: string[];
}

export interface ResultadosGraficosDto {
  id: number;
  nombre: string;
  preguntas: PreguntaResultadoGraficosDto[];
  codigoRespuesta: string;
  activa: boolean;
}
