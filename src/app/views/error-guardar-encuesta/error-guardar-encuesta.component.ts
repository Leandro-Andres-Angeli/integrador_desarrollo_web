import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-error-guardar-encuesta',
  imports: [ButtonModule, RouterModule],
  templateUrl: './error-guardar-encuesta.component.html',
  styleUrl: './error-guardar-encuesta.component.css',
})
export class ErrorGuardarEncuestaComponent {}
