import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enlaces',
  standalone: true,
  imports: [RouterModule, ButtonModule, FloatLabelModule, CheckboxModule, FormsModule],
  templateUrl: './enlaces.component.html',
  styleUrls: ['./enlaces.component.css']
})
export class EnlacesComponent {
  // URLs originales
  urlParticipacion = 'https://www.encuestame.com/censo-ciclo-lectivo-2025-user';
  urlConsulta = 'https://www.encuestame.com/censo-ciclo-lectivo-2025-resp';

  // Estados del checkbox
  acortarParticipacion = false;
  acortarConsulta = false;

  // Simulación de URLs acortadas
  urlCortaParticipacion = 'https://encue.st/p/2025';
  urlCortaConsulta = 'https://encue.st/r/2025';

  // Función para copiar al portapapeles
  copiarTexto(texto: string) {
    navigator.clipboard.writeText(texto).then(() => {
      alert('Link copiado al portapapeles ✔️');
    }).catch(() => {
      alert('Error al copiar el link ❌');
    });
  }

  // Devuelve la URL que se debe mostrar según el estado del checkbox
  obtenerUrlParticipacion(): string {
    return this.acortarParticipacion ? this.urlCortaParticipacion : this.urlParticipacion;
  }

  obtenerUrlConsulta(): string {
    return this.acortarConsulta ? this.urlCortaConsulta : this.urlConsulta;
  }
}
