export interface CrearRespuestaDTO {
    respuestasAbiertas: {
        texto: string;
        pregunta: {id: number};
    }[];
    respuestasOpciones: {
        opcion: {id: number};
        pregunta: {id: number};
    }[];
    respuestasVerdaderoFalso?: {
        valor: boolean;
        pregunta: {id: number};
    }[];
}