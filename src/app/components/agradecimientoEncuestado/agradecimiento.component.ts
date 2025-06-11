import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-agradecimiento',
  imports: [RouterModule, ButtonModule, RouterLink, FooterComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './agradecimiento.component.html',
  styleUrl: './agradecimiento.component.css'
})
export class AgradecimientoComponent {

}
