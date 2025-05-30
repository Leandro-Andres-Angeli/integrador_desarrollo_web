export interface CreateRespuestaDTO {
  respuestasAbiertas: {
    idPregunta: number;
    respuesta: string;
  }[];
  respuestasOpciones: {
    idPregunta: number;
    opciones: number[]; // ID of the selected options
  }[];
}