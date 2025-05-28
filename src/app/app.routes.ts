import { Routes } from '@angular/router';

import { CrearEncuestaComponent } from './components/crearEncuesta/creaEncuesta.component';
import { HomeComponent } from './views/home/home.component';
import { Error404Component } from './components/Errores/error404/error404.component';
import { AgradecimientoComponent } from './components/agradecimiento/agradecimiento.component';

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
    path: 'estadisticas/:id',
    loadComponent: () =>
      import('./components/estadisticas/estadisticas.component').then(
        (m) => m.EstadisticasComponent
      ),
  },
  {
    path: 'agradecimiento',
      component: AgradecimientoComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
