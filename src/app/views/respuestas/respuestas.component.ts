import { Component, model, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CrearRespuestaDTO } from '../../interfaces/crear-respuesta.dto'
import { RespuestasService } from '../../services/respuestas.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EncuestaDTO } from '../../interfaces/encuesta.dto';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmationService } from 'primeng/api';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
    selector: 'app-respuestas',
    imports: [ButtonModule, CommonModule, FormsModule, RadioButtonModule, CheckboxModule, RouterLink],
    templateUrl: './respuestas.component.html',
    styleUrls: ['./respuestas.component.css'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RespuestasComponent implements OnInit {
    encuesta?: EncuestaDTO;
    respuestas: CrearRespuestaDTO = {
        respuestasAbiertas: [],
        respuestasOpciones: [],
        respuestasVerdaderoFalso: []
    };

    opcionesSeleccionadas: { [preguntaId: number]: number[] } = {};
    pageNumber = model<number>(1)

    idEncuesta!: number;
    codigo!: string;

    constructor(
        private respuestasService: RespuestasService,
        private route: ActivatedRoute,
        private router: Router,
        private confirmationService: ConfirmationService
    ) { }

    ngOnInit(): void {

        this.route.params.subscribe(params => {
            this.idEncuesta = +params['id'];
            this.codigo = params['codigoRespuesta'];
            if (this.idEncuesta && this.codigo) {
                this.cargarEncuesta();
            } else {
                this.router.navigate(['/error404']);
            }
        });
    }

    cargarEncuesta(): void {
        console.log('Cargando encuesta: ', this.idEncuesta, this.codigo);
        this.respuestasService.getEncuesta(this.idEncuesta, this.codigo)
            .subscribe({
                next: (data) => {
                    console.log('Encuesta cargada: ', data);
                    this.encuesta = data;
                    this.inicializarRespuestas();
                },
                error: (err) => {
                    console.error('Error al obtener encuesta: ', err);
                    this.router.navigate(['/error404']);

                }
            });
    }

    inicializarRespuestas(): void {
        console.log('Inicializando respuestas para encuesta:', this.encuesta);

        if (!this.encuesta) return;

        this.respuestas = {
            respuestasAbiertas: [],
            respuestasOpciones: [],
            respuestasVerdaderoFalso: []
        };

        this.encuesta.preguntas.forEach((pregunta) => {
            switch (pregunta.tipo) {
                case 'ABIERTA':
                    this.respuestas.respuestasAbiertas.push({
                        texto: '',
                        pregunta: { id: pregunta.id }
                    });
                    break;
                case 'OPCION_MULTIPLE_SELECCION_SIMPLE':
                    this.respuestas.respuestasOpciones.push({
                        opcion: { id: 0 },
                        pregunta: { id: pregunta.id }
                    });
                    break;
                case 'OPCION_MULTIPLE_SELECCION_MULTIPLE':
                    this.opcionesSeleccionadas[pregunta.id] = [];
                    break;
                case 'VERDADERO_FALSO':
                    if (this.respuestas.respuestasVerdaderoFalso) {
                        this.respuestas.respuestasVerdaderoFalso.push({
                            valor: false,
                            pregunta: { id: pregunta.id }
                        });
                    }
                    break;
            }
        });
    }

    // Método actualizado para manejar respuestas abiertas
    guardarRespuestaAbierta(texto: string, index: number): void {
        this.respuestas.respuestasAbiertas[index].texto = texto;
    }

    // Método actualizado para manejar respuestas de opción múltiple
    guardarRespuestaOpcion(opcionId: number, preguntaId: number): void {
        const index = this.respuestas.respuestasOpciones.findIndex(
            r => r.pregunta.id === preguntaId
        );

        if (index !== -1) {
            this.respuestas.respuestasOpciones[index].opcion.id = opcionId;
        } else {
            this.respuestas.respuestasOpciones.push({
                pregunta: { id: preguntaId },
                opcion: { id: opcionId }
            });
        }
    }

    guardarRespuestaMultiple(opcionesId: number[], preguntaId: number): void {
        this.respuestas.respuestasOpciones = this.respuestas.respuestasOpciones.filter(
            r => r.pregunta.id !== preguntaId
        );

        opcionesId.forEach(opcionId => {
            this.respuestas.respuestasOpciones.push({
                opcion: { id: opcionId },
                pregunta: { id: preguntaId }
            });
        });
    }

    // Método actualizado para manejar respuestas
    guardarRespuestaVerdaderoFalso(valor: boolean, index: number): void {
        if (this.respuestas.respuestasVerdaderoFalso && this.respuestas.respuestasVerdaderoFalso[index]) {
            this.respuestas.respuestasVerdaderoFalso[index].valor = valor;
        }
    }

    getAbiertaIndex(i: number): number {
        return this.respuestas.respuestasAbiertas.findIndex(r => r.pregunta.id === this.encuesta?.preguntas[i].id);
    }

    getOpcionSimpleIndex(i: number): number {
        return this.respuestas.respuestasOpciones.findIndex(r => r.pregunta.id === this.encuesta?.preguntas[i].id);
    }

    getOpcionMultipleIndex(i: number): number {
        return this.respuestas.respuestasOpciones.findIndex(r => r.pregunta.id === this.encuesta?.preguntas[i].id);
    }

    getVFIndex(i: number): number {
        return this.respuestas.respuestasVerdaderoFalso?.findIndex(r => r.pregunta.id === this.encuesta?.preguntas[i].id) ?? -1;
    }

    getValorVerdaderoFalso(i: number): boolean {
        const index = this.getVFIndex(i);
        return this.respuestas.respuestasVerdaderoFalso?.[index]?.valor ?? false;
    }


    enviarRespuestas(): void {
        if (!this.encuesta) {
            console.error('No hay encuesta cargada');
            return;
        }

        // Validación de campos vacíos
        if (this.validarRespuestas()) {
            alert('⚠️ Por favor, completá todas las respuestas antes de enviar la encuesta.');
            return;
        }

        console.log('Códigos disponibles:', {
            codigoRespuesta: this.encuesta.codigoRespuesta,
            codigoResultados: this.encuesta.codigoResultados
        });

        this.respuestasService.enviarRespuestas(
            this.idEncuesta,
            this.encuesta.codigoResultados,
            this.respuestas
        ).subscribe({
            next: (response) => {
                console.log('Respuesta exitosa:', response);
                this.router.navigate(['/agradecimiento']);
            },
            error: (error) => {
                console.error('Error detallado:', error);
                alert('Error al enviar las respuestas ❌');
            }
        });
    }

    private validarRespuestas(): boolean {
        if (!this.encuesta) return true;

        const respuestasIncompletas =
            this.respuestas.respuestasAbiertas.some(r => !r.texto?.trim()) ||
            this.respuestas.respuestasOpciones.some(r => !r.opcion?.id) ||
            (this.respuestas.respuestasVerdaderoFalso?.some(r => r.valor === undefined) ?? false) ||
            this.encuesta.preguntas
                .filter(p => p.tipo === 'OPCION_MULTIPLE_SELECCION_MULTIPLE')
                .some(p => {
                    const respuestasDePregunta = this.respuestas.respuestasOpciones.filter(
                        r => r.pregunta.id == p.id
                    );
                    return respuestasDePregunta.length === 0;
                })

        return respuestasIncompletas;
    }




    salir(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: `
            <div class="confirm-delete-message">
                <strong>¿Estás seguro de que deseás salir?</strong> 
                <br>
                Al salir se borraran las respuestas cargadas hasta el momento.
            </div>
            `,
            header: 'Salir',
            closable: false,
            closeOnEscape: true,
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancelar',
                outlined: true,

            },
            acceptButtonProps: {
                label: 'Salir',

            },
            acceptButtonStyleClass: 'confirm-btn',
            rejectButtonStyleClass: 'reject-btn',
            accept: () => {
                this.router.navigate(['/']);
                this.router.navigate(['/']);
            },
            reject: () => {
                return;
                return;
            },
        });
    }
    // ✅ NUEVOS MÉTODOS PARA MULTIMEDIA
    isImage(url: string): boolean {
        return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url);
    }

    isVideo(url: string): boolean {
        return /\.(mp4|webm|ogg)$/i.test(url);
    }
}