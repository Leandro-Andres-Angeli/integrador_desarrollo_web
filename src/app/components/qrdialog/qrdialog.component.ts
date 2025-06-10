import { Component } from '@angular/core';
import { Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import html2canvas from 'html2canvas';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-qrdialog',
  imports: [CommonModule, ButtonModule, DialogModule, QRCodeComponent],
  templateUrl: './qrdialog.component.html',
  styleUrl: './qrdialog.component.css'
})
export class QRDialogComponent {
  @Input() mostrar: boolean = false;
  @Input() qrUrl: string = '';
  @Input() tipoQR: 'Encuesta' | 'Resultados' = 'Encuesta';
  @Output() cerrar = new EventEmitter<void>();

  @ViewChild('qrContainer', { static: false }) qrContainer!: ElementRef;

  cerrarQR() {
    this.cerrar.emit();
  }

  descargarQR() {
    const element = this.qrContainer.nativeElement;
    const logo = element.querySelector('.qr-logo');

    if (logo?.complete) {
      this.generarCanvas(element);
    } else {
      logo.onload = () => this.generarCanvas(element);
    }
  }

  generarCanvas(element: HTMLElement) {
    html2canvas(element, {
      useCORS: true,
      backgroundColor: '#fff',
      scale: 2,
    })
      .then((canvas: { toDataURL: (arg0: string) => string; }) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `QR-Qüesti-${this.tipoQR}.png`;
        link.click();
      })
      .catch((error: any) => {
        console.error('Error al generar imagen del QR: ', error);
      });
  }
}

