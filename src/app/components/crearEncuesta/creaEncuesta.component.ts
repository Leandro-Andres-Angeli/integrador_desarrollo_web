import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { EncuestasService } from '../../services/encuestas.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ChangeDetectorRef } from '@angular/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectModule } from 'primeng/select';
import {
  TiposRespuestaEnum,
  tiposPreguntaPresentacion,
} from '../../enums/tipos-pregunta.enum';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { IconField } from 'primeng/iconfield';

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

    ConfirmDialog,
  ],
  providers: [EncuestasService],
  templateUrl: './crearEncuesta.component.html',
  styleUrl: './crearEncuesta.component.css',
})
export class CrearEncuestaComponent {
  encuestaForm: FormGroup;
  tituloEditando = true;
  modoVistaPrevia = false;

  tiposRespuesta = tiposPreguntaPresentacion.map((t) => ({
    label: t.presentacion,
    value: t.tipo,
  }));

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private encuestasService: EncuestasService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.encuestaForm = this.fb.group({
      nombre: ['', Validators.required],
      preguntas: this.fb.array([]),
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
      tipo: ['abierta', Validators.required],
      obligatoria: [false],
      editando: [true],
      opciones: this.fb.array([]),
    });
    this.preguntas.push(pregunta);
  }

  getOpciones(pregunta: FormGroup): FormArray {
    return pregunta.get('opciones') as FormArray;
  }

  anadirOpcion(pregunta: FormGroup) {
    const opciones = pregunta.get('opciones') as FormArray;
    opciones.push(this.fb.control(''));
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
    this.modoVistaPrevia = true;
    console.log('Modo vista previa activado');
  }

  salirVistaPrevia() {
    this.modoVistaPrevia = false;
  }

  finalizarEncuesta() {
    if (!window.confirm('¿Estás seguro de finalizar y guardar la encuesta?')) {
      return;
    }

    const titulo = this.tituloControl.value;
    const preguntasData = this.preguntasFormGroups.map((p, i) => ({
      numero: i + 1,
      texto: p.get('texto')?.value,
      tipo: p.get('tipo')?.value,
      opciones:
        p.get('tipo')?.value ===
          TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE ||
        p.get('tipo')?.value ===
          TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE
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
      .subscribe({
        next: (res) => {
          console.log('res', res);
          alert('¡Encuesta guardada correctamente!');
        },
        error: () => alert('Error al guardar la encuesta. Intenta más tarde.'),
      });
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
      message: `<div class="confirm-delete-message"> ¿Estás seguro que querés eliminar esta encuesta? <br/>  Al eliminar la encuesta , perderas todo lo que hayas hecho hasta ahora </div>`,

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
}
