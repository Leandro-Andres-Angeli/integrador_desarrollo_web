import { OpcionDTO } from './opcion.dto';

export interface RespuestaOpcionDto {
  id: number;
  opcionId: number;
  cantidad: number;
}

export interface RespuestaVerdaderoFalsoDto {
  id: number;
  valor: boolean;
  cantidad: number;
}

interface RespuestaAbiertaDto {
  id: number;
  texto: string;
}

export interface PreguntaResultadoDto {
  id: number;
  numero: number;
  texto: string;
  tipo: string;
  opciones: OpcionDTO[];
  respuestasOpciones: RespuestaOpcionDto[];
  respuestasAbiertas: RespuestaAbiertaDto[];
  respuestasVF: RespuestaVerdaderoFalsoDto[];
  frecuenciaPalabras: PalabraFrecuenciaDto[];
}

export interface RespuestasDto {
  preguntaId: number;
  textoRespuesta: string[];
}

export interface RespuestaEncuestadoDto {
  id: number;
  respuestas: RespuestasDto[];
}

export interface ResultadosDto {
  id: number;
  nombre: string;
  preguntas: PreguntaResultadoDto[];
  respuestas: RespuestaEncuestadoDto[];
  codigoRespuesta: string;
  activa: boolean;
}
export interface PalabraFrecuenciaDto {
  text: string;
  value: number;
}
