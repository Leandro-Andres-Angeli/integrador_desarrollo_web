export enum TiposRespuestaEnum {
  ABIERTA = 'ABIERTA',
  OPCION_MULTIPLE_SELECCION_SIMPLE = 'OPCION_MULTIPLE_SELECCION_SIMPLE',
  OPCION_MULTIPLE_SELECCION_MULTIPLE = 'OPCION_MULTIPLE_SELECCION_MULTIPLE',
  VERDADERO_FALSO = 'VERDADERO_FALSO',
}

export const tiposPreguntaPresentacion: {
  tipo: TiposRespuestaEnum;
  presentacion: string;
}[] = [
    {
        tipo: TiposRespuestaEnum.ABIERTA,
        presentacion: 'Respuesta abierta',
    },
    {
        tipo: TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE,
        presentacion: 'Respuesta simple',
    },
    {
        tipo: TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE,
        presentacion: 'Respuesta múltiple',
    },
    { 
        tipo: TiposRespuestaEnum.VERDADERO_FALSO, 
        presentacion: 'Verdadero o falso', 
    }, 
]