import { Component, effect, model, OnInit } from '@angular/core';
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
import { MessageModule } from 'primeng/message';
import { catchError } from 'rxjs';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TablaResultadosComponent } from './tabla-resultados/tabla-resultados.component';
import { GraficosResultadosComponent } from './graficos-resultados/graficos-resultados.component';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import {
  PreguntaResultadoDto,
  RespuestaEncuestadoDto,
} from '../../interfaces/resultados.dto';

@Component({
  selector: 'app-resultados',
  styleUrls: ['./resultados.component.css'],
  templateUrl: './resultados.component.html',
  imports: [
    ButtonModule,
    RouterModule,
    NgIf,
    FormsModule,
    CardModule,
    RadioButtonModule,
    CheckboxModule,
    InputTextModule,
    MessageModule,
    JsonPipe,
    TabsModule,
    CommonModule,
    TableModule,
    TablaResultadosComponent,
    GraficosResultadosComponent,
    ToggleSwitchModule
  ],
  standalone: true,
})
export class ResultadosComponent implements OnInit {
  id!: number;
  codigoResultado!: string | null;
  preguntas: PreguntaResultadoDto[] = [];
  respuestas: RespuestaEncuestadoDto[] = [];
  nombre: string = '';
  error: string | null = null;
  prev = false;
  next = true
  pageNumber = model<number>(1)
  constructor(
    private resultadosService: ResultadosService,
    private route: ActivatedRoute
  ) {

    effect(() => {
      this.resultadosService
        .obtenerResultados(this.id, this.codigoResultado!, this.pageNumber())
        .pipe(
          catchError((err) => {
            this.error = 'Error al cargar resultados';
            throw err;
          })
        )
        .subscribe({
          next: (res) => {
            console.log(res)
            this.prev = res.prev
            this.next = res.next
            const { data } = res
            this.nombre = data.nombre;
            this.preguntas = data.preguntas;
            this.respuestas = data.respuestas;

            this.respuestas.sort(
              (a: { id: number }, b: { id: number }) => a.id - b.id
            );
          },
          error: (err) => {
            console.error('Error al cargar resultados', err);
          },
        });
    })
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.codigoResultado = this.route.snapshot.queryParamMap.get('codigo');
    this.resultadosService
      .obtenerResultados(this.id, this.codigoResultado!, this.pageNumber())
      .pipe(
        catchError((err) => {
          this.error = 'Error al cargar resultados';
          throw err;
        })
      )
      .subscribe({
        next: (res) => {
          this.prev = res.prev
          this.next = res.next
          const { data } = res
          this.nombre = data.nombre;
          this.preguntas = data.preguntas;
          this.respuestas = data.respuestas;
          // this.preguntas.sort(
          //   (a: { numero: number }, b: { numero: number }) =>
          //     a.numero - b.numero
          // );
          this.respuestas.sort(
            (a: { id: number }, b: { id: number }) => a.id - b.id
          );
        },
        error: (err) => {
          console.error('Error al cargar resultados', err);
        },
      });
  }

  descargarCSV() {
    this.resultadosService.descargarCSV(
      this.id!,
      this.codigoResultado!,
      this.nombre
    );
  }
}
