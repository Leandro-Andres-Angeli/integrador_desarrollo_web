import { CrearPreguntaDTO } from './crear-pregunta.dto';
import { EncuestaDTO } from './encuesta.dto';

export interface CrearEncuestaDTO  extends Pick<EncuestaDTO, 'nombre'> {
    preguntas: CrearPreguntaDTO[];
}