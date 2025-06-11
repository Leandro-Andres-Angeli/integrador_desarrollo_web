import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-error-guardar-encuesta',
  imports: [ButtonModule, RouterModule, RouterLink, FooterComponent],
  templateUrl: './error-guardar-encuesta.component.html',
  styleUrl: './error-guardar-encuesta.component.css',
})
export class ErrorGuardarEncuestaComponent {}
