import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { TiposRespuestaEnum } from '../enums/tipos-pregunta.enum';

export function validateOpciones(
  preguntaType: AbstractControl<
    TiposRespuestaEnum | null,
    TiposRespuestaEnum | null
  > | null
): ValidatorFn {
  return (control: AbstractControl<Array<string>>): ValidationErrors | null => {
    console.log('validation');
    if (preguntaType?.value === TiposRespuestaEnum.ABIERTA) {
      console.log('here');
      return control.value;
    }
    if (
      preguntaType?.value ===
        TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE ||
      preguntaType?.value ===
        TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE
    ) {
      console.log('control', control.value);
      if (!control.value.some((val) => Boolean(val))) {
        return { error: true };
      }

      return null;
    }
    return null;
  };
}
