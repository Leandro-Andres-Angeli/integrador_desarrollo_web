import { CommonModule } from '@angular/common';
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
import { SelectModule } from 'primeng/select';
import {
  TiposRespuestaEnum,
  tiposPreguntaPresentacion,
} from '../../enums/tipos-pregunta.enum';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

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
    private router: Router,
    private http: HttpClient
  ) {
    this.encuestaForm = this.fb.group({
      nombre: ['', Validators.required],
      preguntas: this.fb.array(
        [],
        [Validators.required, Validators.minLength(1)]
      ),
    });
  }

  get tituloControl(): FormControl {
    return this.encuestaForm.get('nombre') as FormControl;
  }

  get preguntas(): FormArray {
    return this.encuestaForm.get('preguntas') as FormArray;
  }

  get preguntasFormGroups(): FormGroup[] {
    return this.preguntas.controls as FormGroup[];
  }

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
      multimedia: [''],
    });
    this.preguntas.push(pregunta);
  }

  handleTipoRespuestaChange(pregunta: FormGroup) {
    if (
      pregunta.controls['tipo'].value !==
        TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE &&
      pregunta.controls['tipo'].value !==
        TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE
    ) {
      pregunta.removeControl('opciones');
    } else {
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
      respuestaVF: undefined,
    }));
    this.modoVistaPrevia = true;
  }

  salirVistaPrevia() {
    this.modoVistaPrevia = false;
  }

  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'encuestas_publicas');
    formData.append('folder', 'encuestas');

    this.http
      .post<any>('https://api.cloudinary.com/v1_1/dseo6ulep/auto/upload', formData)
      .subscribe({
        next: (res) => {
          const pregunta = this.preguntasFormGroups[index];
          pregunta.get('multimedia')?.setValue({
            url: res.secure_url,
            tipo: res.resource_type,
          });
        },
        error: (err) => {
          console.error('Error subiendo archivo a Cloudinary', err);
          alert('No se pudo subir el archivo. Intenta de nuevo.');
        },
      });
  }

  eliminarMultimedia(pregunta: FormGroup) {
    pregunta.get('multimedia')?.setValue(null);
  }

  finalizarEncuesta() {
    const titulo = this.tituloControl.value;
    const preguntasData = this.preguntasFormGroups.map((p, i) => ({
      numero: i + 1,
      texto: p.get('texto')?.value,
      tipo: p.get('tipo')?.value,
      multimedia: p.get('multimedia')?.value,
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
  }

  eliminarEncuesta() {
    this.encuestaForm.reset();
    this.preguntas.clear();
    this.tituloEditando = true;
    console.log('Encuesta eliminada.');
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
