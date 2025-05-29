import { Component, Input, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tabla-resultados',
  imports: [TableModule, CommonModule],
  standalone: true,
  templateUrl: './tabla-resultados.component.html',
  styleUrl: './tabla-resultados.component.css',
})
export class TablaResultadosComponent {
  preguntas = input<any[]>([]);
  respuestas = input<any[]>([]);

  get tablaRespuestas(): any[] {
    return this.respuestas().map((respuesta) => {
      const fila: any = { id: respuesta.id };

      respuesta.respuestas.forEach((r: any) => {
        fila[r.preguntaId] = r.textoRespuesta.join(', ');
      });

      return fila;
    });
  }
}
