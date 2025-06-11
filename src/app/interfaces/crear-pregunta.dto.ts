import { PreguntaDTO } from "./pregunta.dto";
import { CrearOpcionDTO } from "./crear-opcion.dto";

export interface CrearPreguntaDTO extends Pick<PreguntaDTO, 'numero' | 'texto' | 'tipo'>{
  opciones: CrearOpcionDTO[];
}