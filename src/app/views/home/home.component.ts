import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
@Component({
  selector: 'app-home',
  imports: [
    ButtonModule,
    RouterModule,
    InputGroupModule,
    InputGroupAddonModule,
    FormsModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
})
export class HomeComponent {
  // para testear los resultados
  codigo: string = '';
  id: string = '';
}
