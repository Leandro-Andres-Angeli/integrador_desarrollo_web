import { Routes } from '@angular/router';
import { CrearEncuestaComponent } from './components/crearEncuesta/crearEncuesta.component';
import { HomeComponent } from './views/home/home.component';
import { Error404Component } from './components/Errores/error404/error404.component';
import { AgradecimientoComponent } from './components/agradecimiento/agradecimiento.component';
import { ResultadosComponent } from './views/resultados/resultados.component';
import { ErrorGuardarEncuestaComponent } from './views/error-guardar-encuesta/error-guardar-encuesta.component';
import { EnlacesComponent } from './views/enlaces/enlaces.component';

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
    path: 'enlaces',
    component: EnlacesComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
