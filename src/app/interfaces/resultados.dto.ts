export interface RespuestaVerdaderoFalsoDto {
  id: number;
  valor: boolean;
}

export interface PreguntaResultadoDto {
  id: number;
  numero: number;
  texto: string;
  tipo: string;
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
