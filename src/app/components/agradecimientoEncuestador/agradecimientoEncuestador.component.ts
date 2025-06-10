import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-agradecimiento-encuestador',
  imports: [RouterModule, ButtonModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './agradecimientoEncuestador.component.html',
  styleUrl: './agradecimientoEncuestador.component.css'
})
export class AgradecimientoEncuestadorComponent {

}
