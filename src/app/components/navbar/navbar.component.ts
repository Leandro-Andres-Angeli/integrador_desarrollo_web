import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() modoVistaPrevia = false;

  @Output() vistaPreviaClick = new EventEmitter<void>();
  @Output() salirClick = new EventEmitter<void>();
  @Output() finalizarClick = new EventEmitter<void>();
}
