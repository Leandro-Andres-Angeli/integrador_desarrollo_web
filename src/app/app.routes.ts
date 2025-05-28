import { Routes } from '@angular/router';
import { CrearEncuestaComponent } from './components/crearEncuesta/creaEncuesta.component';
import { HomeComponent } from './views/home/home.component';
import { Error404Component } from './components/Errores/error404/error404.component';
import { ResultadosComponent } from './views/resultados/resultados.component';

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
    path: 'resultados/:id',
    component: ResultadosComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
