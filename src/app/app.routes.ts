import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { CrearEncuestaComponent } from './components/crearEncuesta/creaEncuesta.component';

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
    path: '**',
    redirectTo: '',
  },
];
