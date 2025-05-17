import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import {StyleClassModule} from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
    ImageModule,
    StyleClassModule,
    InputTextModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css', 
  providers: [ ConfirmationService, MessageService],
})
export class AppComponent {
  title = 'frontend';
}
