import { Component, input, model } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
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
  respuestas = input<RespuestaEncuestadoDto[]>([]);
  pageNumber = model<number>(0);
  prev = input.required<boolean>();
  next = input.required<boolean>();

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
    this.pageNumber.update((val) => val + 1);
  }
  decresePageNumber() {
    this.pageNumber.update((val) => val - 1);
  }
}

type FilaResultado = {
  id: number;
  [preguntaId: number]: string;
};
