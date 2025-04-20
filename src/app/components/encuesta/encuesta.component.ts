import { Component, OnInit } from '@angular/core';
import { EncuestaService } from '../../services/encuesta.service';
import { Router } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  standalone: true,
  imports: [CommonModule , JsonPipe]
})
export class EncuestaComponent implements OnInit {
  encuestas: any[] = [];
  
  constructor(
    private encuestaService: EncuestaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarEncuestas();
  }

  cargarEncuestas() {
    console.log('Intentando cargar encuestas...');
    this.encuestaService.getEncuestas().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.encuestas = data;
      },
      error: (error) => {
        console.error('Error al cargar encuestas:', error);
      }
    });
  }

  iniciarEncuesta(encuestaId: number) {
    this.encuestaService.createRespuesta(encuestaId).subscribe(
      respuesta => {
        // Navegar a la página de preguntas con el ID de la respuesta
        this.router.navigate(['/responder', respuesta.id]);
      }
    );
  }
}