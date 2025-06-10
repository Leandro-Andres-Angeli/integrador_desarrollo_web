import { Component, effect, model, OnInit } from '@angular/core';
import { ResultadosService } from '../../services/resultados.service';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
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
import {
  ToggleSwitchModule,
  ToggleSwitchChangeEvent,
} from 'primeng/toggleswitch';
import {
  PreguntaResultadoDto,
  RespuestaEncuestadoDto,
} from '../../interfaces/resultados.dto';

import { EncuestasService } from '../../services/encuestas.service';

import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';

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
    TabsModule,
    CommonModule,
    TableModule,
    TablaResultadosComponent,
    GraficosResultadosComponent,
    ToggleSwitchModule,
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
  activa!: boolean;
  prev = false;
  next = true;
  pageNumber = model<number>(1);
  constructor(
    private resultadosService: ResultadosService,
    private encuestasService: EncuestasService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
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
            console.log(res);
            this.prev = res.prev;
            this.next = res.next;
            const { data } = res;
            this.nombre = data.nombre;
            this.preguntas = data.preguntas;
            this.respuestas = data.respuestas;
            this.activa = data.activa;
            this.respuestas.sort(
              (a: { id: number }, b: { id: number }) => a.id - b.id
            );
          },
          error: (err) => {
            console.error('Error al cargar resultados', err);
          },
        });
    });
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
          this.prev = res.prev;
          this.next = res.next;
          const { data } = res;
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
  cambiarEstadoEncuesta(): void {
    this.encuestasService
      .cambiarEstadoEncuesta(this.id!, this.codigoResultado!, this.activa)
      .subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Nuevo Estado',
            detail: res.mensaje,
            life: 3000,
          });
        },

        error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ocurrió un error',
            life: 3000,
          });
        },
      });
  }

  confirmarCambiarEstadoEncuesta(event: ToggleSwitchChangeEvent) {
    const nuevoEstado = event.checked;
    this.confirmationService.confirm({
      target: event.originalEvent?.currentTarget as HTMLElement,
      message: `<div class="confirm-delete-message"> ¿Estás seguro de que querés ${
        nuevoEstado ? 'activar' : 'desactivar'
      } esta encuesta? ${
        nuevoEstado === false
          ? 'Al desactivar no se recibirán más respuestas.'
          : ''
      }`,
      header: `${nuevoEstado ? 'Activar' : 'Desactivar'} encuesta`,
      closable: false,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        outlined: true,
      },
      acceptButtonProps: {
        label: nuevoEstado ? 'Activar' : 'Desactivar',
      },
      acceptButtonStyleClass: 'confirm-btn',
      rejectButtonStyleClass: 'reject-btn',
      acceptIcon: PrimeIcons.CHECK,
      accept: () => {
        this.cambiarEstadoEncuesta();
      },
      reject: () => {
        this.activa = !this.activa;
        return;
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
