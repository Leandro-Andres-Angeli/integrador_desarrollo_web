import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { CrearEncuestaComponent } from './components/crearEncuesta/crearEncuesta.component';
import { Error404Component } from './components/Errores/error404/error404.component';
import { AgradecimientoComponent } from './components/agradecimientoEncuestado/agradecimiento.component';
import { ResultadosComponent } from './views/resultados/resultados.component';
import { ErrorGuardarEncuestaComponent } from './components/Errores/error-guardar-encuesta/error-guardar-encuesta.component';
import { EnlacesComponent } from './views/enlaces/enlaces.component';
import { RespuestasComponent } from './views/respuestas/respuestas.component';
import { AgradecimientoEncuestadorComponent } from './components/agradecimientoEncuestador/agradecimientoEncuestador.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'crearEncuesta',
    component: CrearEncuestaComponent,
  },
  {

    path: 'error-guardar-encuesta',
    component: ErrorGuardarEncuestaComponent,
  },
  {
    path: 'error404',
    component: Error404Component,
  },
  {
    path: 'guardarError',
    component: ErrorGuardarEncuestaComponent,
  },
  {
    path: 'resultados/:id',
    component: ResultadosComponent,
  },
  {
    path: 'agradecimiento',
    component: AgradecimientoComponent,
  },
  {
    path: 'agradecimiento-encuestador',
    component: AgradecimientoEncuestadorComponent,
  },
  {
    path: 'enlaces/:id/:codigoRespuesta/:codigoResultados',
    component: EnlacesComponent,
  },
  {
    path:  'respuestas/:id/:codigoRespuesta',
    component: RespuestasComponent,
  },
  {

    path: '**',
    redirectTo: '',
  },
];
