import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-error404',
  imports: [ButtonModule, RouterModule, FooterComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.css',
})
export class Error404Component {
}
