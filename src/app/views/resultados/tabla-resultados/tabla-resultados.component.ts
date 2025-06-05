import { Component, Input, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import {
  PreguntaResultadoDto,
  RespuestaEncuestadoDto,
  RespuestasDto,
} from '../../../interfaces/resultados.dto';
@Component({
  selector: 'app-tabla-resultados',
  imports: [TableModule, CommonModule],
  standalone: true,
  templateUrl: './tabla-resultados.component.html',
  styleUrl: './tabla-resultados.component.css',
})
export class TablaResultadosComponent {
  preguntas = input<PreguntaResultadoDto[]>([]);
  respuestas = input<RespuestaEncuestadoDto[]>([]);

  get tablaRespuestas(): FilaResultado[] {
    return this.respuestas().map((respuesta) => {
      const fila: FilaResultado = { id: respuesta.id };

      respuesta.respuestas.forEach((r: RespuestasDto) => {
        fila[r.preguntaId] = r.textoRespuesta.join(', ');
      });

      return fila;
    });
  }
}

type FilaResultado = {
  id: number;
  [preguntaId: number]: string;
};
