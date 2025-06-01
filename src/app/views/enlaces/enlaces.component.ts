import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { QRCodeComponent } from 'angularx-qrcode'; // Importación del componente QR
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-enlaces',
  standalone: true,
  imports: [RouterModule, ButtonModule, FloatLabelModule, CheckboxModule, FormsModule, QRCodeComponent, CommonModule ],
  templateUrl: './enlaces.component.html',
  styleUrls: ['./enlaces.component.css']
})
export class EnlacesComponent implements OnInit {
  urlParticipacion: string = '';
  urlConsulta: string = '';

  acortarParticipacion = false;
  acortarConsulta = false;

  urlCortaParticipacion = 'https://encue.st/p/2025';
  urlCortaConsulta = 'https://encue.st/r/2025';

  //Manejo para mostrar el QR
  mostrarQR: boolean = false;
  qrUrl: string = '';    

  // Referencia al contenedor del QR para descargarlo
  @ViewChild('qrContainer', { static: false }) qrContainer!: ElementRef;

  tipoQR: 'participacion' | 'consulta' = 'participacion';

  constructor() {}

  ngOnInit(): void {
    // Aquí puedes inicializar algo si necesitas al iniciar el componente
  }

  // Función para copiar al portapapeles
  copiarTexto(texto: string) {
    navigator.clipboard.writeText(texto).then(() => {
      alert('Link copiado al portapapeles ✔️');
    }).catch(() => {
      alert('Error al copiar el link ❌');
    });
  }

  obtenerUrlParticipacion(): string {
    return this.acortarParticipacion ? this.urlCortaParticipacion : this.urlParticipacion;
  }

  obtenerUrlConsulta(): string {
    return this.acortarConsulta ? this.urlCortaConsulta : this.urlConsulta;
  }

  // Función para mostrar el QR
  mostrarQRParticipacion() {
    this.qrUrl = this.obtenerUrlParticipacion();
    this.tipoQR = 'participacion'; // Establece el tipo de QR
    this.mostrarQR = true;
  }

  mostrarQRConsulta() {
    this.qrUrl = this.obtenerUrlConsulta();
    this.tipoQR = 'consulta'; // Establece el tipo de QR
    this.mostrarQR = true;
  }

  // Función para ocultar el QR
  cerrarQR() {
    this.mostrarQR = false;
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
      scale: 2 // Aumenta la resolución del canvas
    }).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('imagen/png');
      
      // Personaliza el nombre del archivo según el tipo de QR
      const nombreArchivo =  `codigo-qr-Questi-${this.tipoQR}.png`;
      link.download = nombreArchivo;
      link.click();
    }).catch(error => {
      console.log('Error al generar imagen del QR: ' , error);
    });
  }
}
