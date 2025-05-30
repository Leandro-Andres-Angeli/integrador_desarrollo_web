import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-error-guardar-encuesta',
  imports: [ButtonModule, RouterModule, RouterLink],
  templateUrl: './error-guardar-encuesta.component.html',
  styleUrl: './error-guardar-encuesta.component.css',
})
export class ErrorGuardarEncuestaComponent {}
