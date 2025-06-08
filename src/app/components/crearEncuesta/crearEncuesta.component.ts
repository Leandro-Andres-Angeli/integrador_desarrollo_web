import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { EncuestasService } from '../../services/encuestas.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ChangeDetectorRef } from '@angular/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import {
  TiposRespuestaEnum,
  tiposPreguntaPresentacion,
} from '../../enums/tipos-pregunta.enum';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-crearEncuesta',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ButtonModule,
    InputTextModule,
    RouterModule,
    FloatLabelModule,
    ReactiveFormsModule,
    SelectModule,
    CheckboxModule,
    RadioButtonModule,
    ToggleSwitchModule,
    FormsModule,
    JsonPipe,
  ],
  providers: [EncuestasService],
  templateUrl: './crearEncuesta.component.html',
  styleUrl: './crearEncuesta.component.css',
})
export class CrearEncuestaComponent {
  encuestaForm: FormGroup;
  tituloEditando = true;
  modoVistaPrevia = false;

  vistaPreviaRespuestas: {
    respuestaAbierta?: string;
    respuestaSimple?: string;
    respuestaMultiple?: string[];
    respuestaVF?: boolean;
  }[] = [];

  tiposRespuesta = tiposPreguntaPresentacion.map((t) => ({
    label: t.presentacion,
    value: t.tipo,
  }));

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private encuestasService: EncuestasService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.encuestaForm = this.fb.group({
      nombre: ['', Validators.required],
      preguntas: this.fb.array(
        [],
        [Validators.required, Validators.minLength(1)]
      ),
    });
  }

  // Getters
  get tituloControl(): FormControl {
    return this.encuestaForm.get('nombre') as FormControl;
  }

  get preguntas(): FormArray {
    return this.encuestaForm.get('preguntas') as FormArray;
  }

  get preguntasFormGroups(): FormGroup[] {
    return this.preguntas.controls as FormGroup[];
  }

  // Métodos UI
  editarTitulo(): void {
    this.tituloEditando = true;
  }

  guardarTitulo(): void {
    if (this.tituloControl.valid) {
      this.tituloEditando = false;
    }
  }

  anadirPregunta(): void {
    const pregunta = this.fb.group({
      texto: ['', Validators.required],
      tipo: [TiposRespuestaEnum.ABIERTA, Validators.required],
      obligatoria: [false],
      editando: [true],
    });
    // pregunta
    //   .get('opciones')
    //   ?.setValidators(validateOpciones(pregunta.get('tipo')));
    this.preguntas.push(pregunta);
  }
  handleTipoRespuestaChange(pregunta: FormGroup) {
    if (pregunta.controls['tipo'].value !== TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE &&
      pregunta.controls['tipo'].value !== TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE

    ) {
      pregunta.removeControl('opciones');
    } else {
      console.log('here');
      pregunta.addControl(
        'opciones',
        this.fb.array(
          [['', Validators.required]],
          [Validators.required, Validators.minLength(2)]
        )
      );
    }
  }

  getOpciones(pregunta: FormGroup): FormArray {
    return pregunta.get('opciones') as FormArray;
  }

  anadirOpcion(pregunta: FormGroup) {
    const opciones = pregunta.get('opciones') as FormArray;
    opciones.push(this.fb.control('', Validators.required));
  }

  eliminarOpcion(pregunta: FormGroup, index: number): void {
    const opciones = pregunta.get('opciones') as FormArray;
    opciones.removeAt(index);
  }

  eliminarPregunta(index: number) {
    this.preguntas.removeAt(index);
  }

  guardarPregunta(pregunta: FormGroup) {
    pregunta.get('editando')?.setValue(false);
  }

  editarPregunta(pregunta: FormGroup) {
    pregunta.get('editando')?.setValue(true);
  }

  cancelarEdicion(pregunta: FormGroup) {
    pregunta.get('editando')?.setValue(false);
  }

  activarVistaPrevia() {
  this.vistaPreviaRespuestas = this.preguntasFormGroups.map(() => ({
    respuestaAbierta: '',
    respuestaSimple: '',
    respuestaMultiple: [],
    respuestaVF: undefined
  }));
  this.modoVistaPrevia = true;
}

  salirVistaPrevia() {
    this.modoVistaPrevia = false;
  }

  finalizarEncuesta() {
    // if (!window.confirm('¿Estás seguro de finalizar y guardar la encuesta?')) {
    //   return;
    // }

    const titulo = this.tituloControl.value;
    const preguntasData = this.preguntasFormGroups.map((p, i) => ({
      numero: i + 1,
      texto: p.get('texto')?.value,
      tipo: p.get('tipo')?.value,
      opciones: (
        p.get('tipo')?.value ===
        TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE ||
        p.get('tipo')?.value ===
        TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE
      )
        ? this.getOpciones(p).controls.map((ctrl, idx) => ({
          texto: ctrl.value,
          numero: idx + 1,
        }))
        : [],
    }));

    this.encuestasService
      .crearEncuesta({
        nombre: this.tituloControl.value,
        preguntas: preguntasData,
      })
      //CODIGO PARA FORZAR ERROR Y CHEQUEAR REDIRECCION
      // .pipe(
      //   map((e) => {
      //     throw Error('test error');
      //   })
      // )
      //CODIGO PARA FORZAR ERROR Y CHEQUEAR REDIRECCION
      .subscribe({
        next: (res) => {
          console.log('Respuesta backend:', res);
          this.router.navigate([
            '/enlaces',
            res.id,
            res.codigoRespuesta,
            res.codigoResultados,
          ]);
        },
        error: () => {
          alert('Error al guardar la encuesta. Intenta más tarde.');
        },
      });
    // .subscribe({
    //   next: (res) => {
    //     console.log('Respuesta backend:', res);
    //     this.router.navigate([
    //       '/enlaces',
    //       res.id,
    //       res.codigoRespuesta,
    //       res.codigoResultados,
    //       ,
    //       { state: { test: 1 } },
    //     ]);
    //   },
    //   error: () => {
    //     alert('Error al guardar la encuesta. Intenta más tarde.');
    //   },
    // });
  }

  eliminarEncuesta() {
    // Simplemente reiniciamos el formulario:
    this.encuestaForm.reset();
    this.preguntas.clear();
    this.tituloEditando = true;

    console.log('Encuesta eliminada');
  }

  getPresentacionTipo(tipo: string): string {
    const encontrado = tiposPreguntaPresentacion.find((t) => t.tipo === tipo);
    return encontrado ? encontrado.presentacion : tipo;
  }
  confirmClearEncuesta(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `<div class="confirm-delete-message"> ¿Estás seguro de que querés eliminar esta encuesta? <br/>  Al eliminar la encuesta perderás todo lo que hayas hecho hasta ahora. </div>`,

      header: 'Eliminar encuesta',
      closable: false,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',

        outlined: true,
      },
      acceptButtonProps: {
        label: 'Eliminar',
      },
      acceptButtonStyleClass: 'confirm-btn',
      rejectButtonStyleClass: 'reject-btn',
      acceptIcon: PrimeIcons.TRASH,
      accept: () => {
        this.eliminarEncuesta();
      },
      reject: () => {
        return;
      },
    });
  }
  confirmSaveEncuesta() {
    this.confirmationService.confirm({
      message: `<div class="confirm-save-encuesta"> 
      Al finalizar la encuesta te devolveremos dos links para que puedas compartirla y consultarla.
      <br/>
      <strong> RECUERDA GUARDAR LOS LINKS</strong> para no perder tu acceso a la encuesta.
      </div>`,

      header: 'Finalizar encuesta',
      closable: false,
      closeOnEscape: true,

      rejectButtonProps: {
        label: 'Cancelar',

        outlined: true,
      },
      acceptButtonProps: {
        label: 'Finalizar',
      },
      acceptButtonStyleClass: 'confirm-btn',
      rejectButtonStyleClass: 'reject-btn',
      acceptIcon: PrimeIcons.CHECK,
      accept: () => {
        this.finalizarEncuesta();
      },
      reject: () => {
        return;
      },
    });
  }
}
