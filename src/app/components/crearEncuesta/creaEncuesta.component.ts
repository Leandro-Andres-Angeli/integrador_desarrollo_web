import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { EncuestasService } from '../../services/encuestas.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ChangeDetectorRef } from '@angular/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

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
    FormsModule,
    DropdownModule,
    CheckboxModule,     
    RadioButtonModule,
    ToggleSwitchModule 
  ],
  providers: [EncuestasService],
  templateUrl: './crearEncuesta.component.html',
  styleUrl: './crearEncuesta.component.css'
})
export class CrearEncuestaComponent {
  encuestaForm: FormGroup;
  tituloEditando = true;
  modoVistaPrevia = false;

  tiposRespuesta = [
    { label: 'Respuesta abierta', value: 'abierta' },
    { label: 'Respuesta simple', value: 'opcion_simple' },
    { label: 'Respuesta múltiple', value: 'opcion_multiple' },
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private encuestasService: EncuestasService
  ) {
    this.encuestaForm = this.fb.group({
      titulo: ['', Validators.required],
      preguntas: this.fb.array([])
    });
  }

  // Getters
  get tituloControl(): FormControl {
    return this.encuestaForm.get('titulo') as FormControl;
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
      opciones: this.fb.array([])
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
    // this.cdr.detectChanges();
  }

  salirVistaPrevia() {
    this.modoVistaPrevia = false;
    // this.cdr.detectChanges();
  }

  finalizarEncuesta() {
    if (!window.confirm('¿Estás seguro de finalizar y guardar la encuesta?')) {
      return;
    }

    const titulo = this.tituloControl.value;
    const preguntasData = this.preguntasFormGroups.map((p, i) => ({
      numero: i + 1,
      texto: p.get('texto')?.value,
      tipoRespuesta: p.get('tipo')?.value,
      seleccionMultiple: p.get('tipo')?.value === 'opcion_multiple',
      opciones: this.getOpciones(p).value.filter((op: string) => !!op?.trim())
    }));

    this.encuestasService.crearEncuesta({ nombre: titulo }).subscribe({
      next: (encuestaCreada: any) => {
        const encuestaId = encuestaCreada.id;
        preguntasData.forEach(pregunta => {
          this.encuestasService.crearPregunta({ ...pregunta, encuestaId }).subscribe();
        });
        this.encuestasService.notificarRefresco(); // <-- refresca la tabla
        alert('¡Encuesta guardada correctamente!');
      },
      error: (err: any) => {
        alert('Error al guardar la encuesta. Intenta más tarde.');
      }
    });
  }


  eliminarEncuesta() {
    // Simplemente reiniciamos el formulario:
    this.encuestaForm.reset();
    this.preguntas.clear();
    this.tituloEditando = true;

    console.log('Encuesta eliminada');
  }
}