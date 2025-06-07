export interface CrearRespuestaAbiertaDto {
  texto: string;
  pregunta: { id: number };
}

export interface CrearRespuestaOpcionDto {
  opcion: { id: number };
  pregunta: { id: number };
}

export interface CrearRespuestaVerdaderoFalsoDTO {
    id: number;
    pregunta: { id: number };
    valor: boolean;
}

export interface CrearResultadoDto {
  respuestasAbiertas: CrearRespuestaAbiertaDto[];
  respuestasOpciones: CrearRespuestaOpcionDto[];
  respuestasVerdaderoFalso: CrearRespuestaVerdaderoFalsoDTO[];
}
