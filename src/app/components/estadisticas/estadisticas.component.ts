import { Component, OnInit, Input } from '@angular/core';
import { EstadisticasService } from '../../services/estadisticas.service';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { FieldsetModule } from 'primeng/fieldset';
import { ChartModule } from 'primeng/chart';
import { ScrollPanelModule } from 'primeng/scrollpanel';
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  imports: [
    ButtonModule,
    RouterModule,
    NgFor,
    NgIf,
    FormsModule,
    CardModule,
    RadioButtonModule,
    CheckboxModule,
    InputTextModule,
    AccordionModule,
    FieldsetModule,
    ChartModule,
    ScrollPanelModule,
  ],
  standalone: true,
})
export class EstadisticasComponent implements OnInit {
  datos: any;
  preguntas: any;
  respuestas: any = {};

  options: any;
  constructor(
    private estadisticasService: EstadisticasService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const codigoResultado = this.route.snapshot.queryParamMap.get('codigo');
    this.estadisticasService
      .obtenerEstadisticas(id, codigoResultado!)
      .subscribe({
        next: (res) => {
          this.datos = res;
          this.preguntas = res.preguntas;
          this.preguntas.sort(
            (a: { numero: number }, b: { numero: number }) =>
              a.numero - b.numero
          );
          console.log('Datos recibidos:', this.datos);
        },
        error: (err) => {
          console.error('Error al cargar estadísticas', err);
        },
      });
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.options = {
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
  getData(pregunta: any) {
    const data = {
      labels: pregunta.opciones.map((o: any) => {
        return o.texto;
      }),
      datasets: [
        {
          label: 'Cantidad',
          data: pregunta.respuestasOpciones.map((ro: any) => {
            return ro.cantidad;
          }),
        },
      ],
    };
    return data;
  }
}
