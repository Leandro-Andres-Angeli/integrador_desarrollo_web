import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-agradecimiento',
  imports: [RouterModule, ButtonModule, RouterLink],
  templateUrl: './agradecimiento.component.html',
  styleUrl: './agradecimiento.component.css'
})
export class AgradecimientoComponent {

}
