import { Component, input } from '@angular/core';
import {
  PreguntaResultadoDto,
  RespuestaEncuestadoDto,
  RespuestaOpcionDto,
} from '../../../interfaces/resultados.dto';
import { ChartModule } from 'primeng/chart';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AccordionModule } from 'primeng/accordion';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { AngularD3CloudComponent } from 'angular-d3-cloud';
import { MessageModule } from 'primeng/message';
import { TabsModule } from 'primeng/tabs';
import { OpcionDTO } from '../../../interfaces/opcion.dto';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-graficos-resultados',
  templateUrl: './graficos-resultados.component.html',
  styleUrl: './graficos-resultados.component.css',
  standalone: true,
  imports: [
    ChartModule,
    ScrollPanelModule,
    AccordionModule,
    AccordionModule,
    FieldsetModule,
    CardModule,
    MessageModule,
    TabsModule,
    AngularD3CloudComponent,
    NgFor,
    NgIf,
  ],
})
export class GraficosResultadosComponent {
  preguntas = input<PreguntaResultadoDto[]>([]);
  respuestas = input<RespuestaEncuestadoDto[]>([]);
  opcionesGrafico: any;

  fontSizeMapper = (palabra: any) => palabra.value * 25;
  rotate = () => ~~(Math.random() * 2) * 90;
  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.opcionesGrafico = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    };
  }
  getData(pregunta: PreguntaResultadoDto) {
    const data = {
      labels: pregunta.opciones.map((o: OpcionDTO) => {
        return o.texto;
      }),
      datasets: [
        {
          label: 'Cantidad',
          data: pregunta.respuestasOpciones.map((ro: RespuestaOpcionDto) => {
            return ro.cantidad;
          }),
        },
      ],
    };
    return data;
  }
}
