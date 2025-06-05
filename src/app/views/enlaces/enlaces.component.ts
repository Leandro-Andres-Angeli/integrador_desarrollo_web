import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { QRDialogComponent } from '../../components/qrdialog/qrdialog.component';
import { EnlacesService } from '../../services/enlaces.service';

interface Enlaces {
  urlParticipacion: string;
  urlConsulta: string;
}

@Component({
  selector: 'app-enlaces',
  standalone: true,
  imports: [
    ButtonModule,
    FloatLabelModule,
    CheckboxModule,
    FormsModule,
    CommonModule,
    QRDialogComponent
  ],
  templateUrl: './enlaces.component.html',
  styleUrls: ['./enlaces.component.css'],
})
export class EnlacesComponent implements OnInit {
  mostrarQR: boolean = false;
  tipoQR: 'Encuesta' | 'Resultados' = 'Encuesta';

  idEncuesta!: number;
  codigoRespuesta!: string;
  codigoResultados: string = '';

  enlaceParticipacion: string = '';
  enlaceConsulta: string = '';


  acortarParticipacion = false;
  acortarConsulta = false;

  constructor(
    private route: ActivatedRoute,
    private enlacesService: EnlacesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const codResul = params.get('codigoResultados');
      const codResp = params.get('codigoRespuesta');

      if (!idParam || !codResp || !codResul) {
        console.error('Parámetros inválidos en la URL');
        return;
      }

      this.idEncuesta = +idParam;
      this.codigoResultados = codResul;
      this.codigoRespuesta = codResp;

      this.enlacesService.generarEnlaces(this.idEncuesta, this.codigoResultados, this.codigoRespuesta).subscribe({
        next: (enlaces: Enlaces) => {
          this.enlaceParticipacion = enlaces.urlParticipacion;
          this.enlaceConsulta = enlaces.urlConsulta;
        },
        error: (err: any) => {
          console.error('Error al generar enlaces:', err);
        }
      });
    });
  }

  obtenerUrlParticipacion(): string {
    if (this.acortarParticipacion) {
      const cortos = this.enlacesService.generarEnlacesCortos(this.idEncuesta);
      return cortos.urlParticipacion;
    }
    return this.enlaceParticipacion;
  }

  obtenerUrlConsulta(): string {
    if (this.acortarConsulta) {
      const cortos = this.enlacesService.generarEnlacesCortos(this.idEncuesta);
      return cortos.urlConsulta;
    }
    return this.enlaceConsulta;
  }

  async copiarTexto(texto: string): Promise<void> {
    const ok = await this.enlacesService.copiarAlPortapapeles(texto);
    if (ok) {
      alert('Link copiado al portapapeles ✔️');
    }
  }

  mostrarQRParticipacion(): void {
    this.tipoQR = 'Encuesta';
    this.mostrarQR = true;
  }

  mostrarQRConsulta(): void {
    this.tipoQR = 'Resultados';
    this.mostrarQR = true;
  }

  cerrarQR(): void {
    this.mostrarQR = false;
  }

  get qrUrl(): string {
    return this.tipoQR === 'Encuesta'
      ? this.obtenerUrlParticipacion()
      : this.obtenerUrlConsulta();
  }
}
