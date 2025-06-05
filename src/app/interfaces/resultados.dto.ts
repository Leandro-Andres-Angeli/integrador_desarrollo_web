import { OpcionDTO } from './opcion.dto';

export interface RespuestaOpcionDto {
  id: number;
  opcionId: number;
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
}
export interface PalabraFrecuenciaDto {
  text: string;
  value: number;
}
