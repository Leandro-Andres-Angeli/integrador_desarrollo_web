import { Component, OnInit, Input } from '@angular/core';
import { ResultadosService } from '../../services/resultados.service';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { FieldsetModule } from 'primeng/fieldset';
import { ChartModule } from 'primeng/chart';
import { MessageModule } from 'primeng/message';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { catchError } from 'rxjs';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TablaResultadosComponent } from './tabla-resultados/tabla-resultados.component';
import { AngularD3CloudComponent } from 'angular-d3-cloud';
@Component({
  selector: 'app-resultados',
  styleUrls: ['./resultados.component.css'],
  templateUrl: './resultados.component.html',
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
    MessageModule,
    JsonPipe,
    TabsModule,
    CommonModule,
    TableModule,
    TablaResultadosComponent,
    AngularD3CloudComponent,
  ],
  standalone: true,
})
export class ResultadosComponent implements OnInit {
  preguntas: any;
  respuestas: any = {};
  nombre: string = '';
  error: string | null = null;
  options: any;

  fontSizeMapper = (word: any) => word.value * 25;
  rotate = () => ~~(Math.random() * 2) * 90;
  constructor(
    private resultadosService: ResultadosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const codigoResultado = this.route.snapshot.queryParamMap.get('codigo');
    this.resultadosService
      .obtenerResultados(id, codigoResultado!)
      .pipe(
        catchError((err) => {
          this.error = 'Error al cargar resultados';
          throw err;
        })
      )
      .subscribe({
        next: (res) => {
          this.nombre = res.nombre;
          this.preguntas = res.preguntas;
          this.respuestas = res.respuestas;
          console.log(this.preguntas, 'this.preguntas');
          this.preguntas.sort(
            (a: { numero: number }, b: { numero: number }) =>
              a.numero - b.numero
          );

          this.preguntas.sort(
            (a: { numero: number }, b: { numero: number }) =>
              a.numero - b.numero
          );

          console.log('Datos recibidos:', res);
        },
        error: (err) => {
          console.error('Error al cargar resultados', err);
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
