import { Routes } from '@angular/router';
import { EncuestaComponent } from './components/encuesta/encuesta.component';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/encuestas', 
    pathMatch: 'full' 
  },
  { 
    path: 'encuestas', 
    component: EncuestaComponent 
  },
  { 
    path: 'responder/:id', 
    component: EncuestaComponent 
  }
];
