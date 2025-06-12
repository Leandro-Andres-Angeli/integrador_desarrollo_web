import { Component, effect, input, model } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule, JsonPipe } from '@angular/common';
import {
  PreguntaResultadoDto,
  RespuestaEncuestadoDto,
  RespuestasDto,
} from '../../../interfaces/resultados.dto';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-tabla-resultados',
  imports: [TableModule, CommonModule, ButtonModule],
  standalone: true,
  templateUrl: './tabla-resultados.component.html',
  styleUrl: './tabla-resultados.component.css',
})
export class TablaResultadosComponent {
  preguntas = input<PreguntaResultadoDto[]>([]);
  respuestas = input<Array<RespuestaEncuestadoDto & { idx: number }>>([]);
  pageNumber = model<number>(0);
  prev = input.required<boolean>();
  next = input.required<boolean>();
  debounce = model<boolean>(false)
  indexes = input<Array<number>>()
  constructor() {
    effect(() => {

      if (this.debounce()) {

        setTimeout(() => {
          this.debounce.set(false)
        }, 400)

      }

    })
  }
  get tablaRespuestas(): FilaResultado[] {
    return this.respuestas().map((respuesta) => {
      const fila: FilaResultado = { id: respuesta.id };

      respuesta.respuestas.forEach((r: RespuestasDto) => {
        fila[r.preguntaId] = r.textoRespuesta.join(', ');
      });

      return fila;
    });
  }

  addPageNumber() {
    if (!this.debounce()) {
      setTimeout(() => {
        this.pageNumber.update((val) => val + 1);
      }, 300);

      this.debounce.set(true)
    }


  }
  decreasePageNumber() {

    if (this.pageNumber() < 1) {
      return
    }

    if (!this.debounce()) {
      setTimeout(() => {
        this.pageNumber.update((val) => val - 1);
      }, 300)

      this.debounce.set(true)
    }


  }

}

type FilaResultado = {
  id: number;
  [preguntaId: number]: string;
};
