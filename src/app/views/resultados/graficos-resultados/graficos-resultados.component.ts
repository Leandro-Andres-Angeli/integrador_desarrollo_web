import { Component, HostListener, input } from '@angular/core';
import {
  PreguntaResultadoGraficosDto,
  RespuestaOpcionGraficosDto,
  RespuestaVerdaderoFalsoGraficosDto,
} from '../../../interfaces/resultados.graficos.dto';
import { ChartModule } from 'primeng/chart';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AccordionModule } from 'primeng/accordion';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { TabsModule } from 'primeng/tabs';
import { OpcionDTO } from '../../../interfaces/opcion.dto';
import { NgFor, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CloudOptions, ZoomOnHoverOptions } from 'angular-tag-cloud-module';
import { TagCloudComponent } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-graficos-resultados',
  templateUrl: './graficos-resultados.component.html',
  styleUrl: './graficos-resultados.component.css',
  standalone: true,
  imports: [
    ChartModule,
    ScrollPanelModule,
    AccordionModule,
    FieldsetModule,
    CardModule,
    MessageModule,
    TabsModule,
    NgFor,
    NgIf,
    ButtonModule,
    TagCloudComponent,
  ],
  animations: [],
})
export class GraficosResultadosComponent {
  preguntas = input<PreguntaResultadoGraficosDto[]>([]);
  hayRespuestas = input<boolean>(false);

  activeTab = input<number>(0);
  showTagCloud = true;

  opcionesGrafico: any;
  opcionesNubePalabras: CloudOptions = {
    height: 200,
    overflow: false,
    realignOnResize: true,
  };
  opcionesZoom: ZoomOnHoverOptions = {
    scale: 1.1,
    transitionTime: 0.5,
    delay: 0.2,
  };

  containerWidth = window.innerWidth * 0.7;

  @HostListener('window:resize')
  onResize() {
    this.containerWidth = window.innerWidth * 0.7;
  }

  ngOnChanges() {
    this.showTagCloud = false;
    setTimeout(() => {
      this.showTagCloud = true;
    }, 50);
  }

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
      responsive: true,
      maintainAspectRatio: true,
    };
  }

  getData(pregunta: PreguntaResultadoGraficosDto) {
    const data = {
      labels: pregunta.opciones
        .sort((a: OpcionDTO, b: OpcionDTO) => a.numero - b.numero)
        .map((o: OpcionDTO) => {
          return o.texto;
        }),
      datasets: [
        {
          label: 'Cantidad',
          data: pregunta.respuestasOpciones.map(
            (ro: RespuestaOpcionGraficosDto) => {
              return ro.cantidad;
            }
          ),
          backgroundColor: ['#D1A2F3', '#BAECEB', '#DEFFDB','#FFEDEC'],
        },
      ],
    };
    return data;
  }

  getDataVF(pregunta: PreguntaResultadoGraficosDto) {
    const data = {
      labels: pregunta.opciones
        .sort((a: OpcionDTO, b: OpcionDTO) => a.numero - b.numero)
        .map((o: OpcionDTO) => {
          return o.texto;
        }),
      datasets: [
        {
          label: 'Cantidad',
          data: pregunta.respuestasVF.map(
            (rvf: RespuestaVerdaderoFalsoGraficosDto) => {
              return rvf.cantidad;
            }
          ),
          backgroundColor: ['#D1A2F3', '#BAECEB']
        },
      ],
    };
    return data;
  }
}
