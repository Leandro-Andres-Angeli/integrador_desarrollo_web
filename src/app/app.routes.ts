import { Routes } from '@angular/router';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { CreateSurveyComponent } from './views/create-survey/create-survey.component';

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
  ,
  { 
    path: 'crear-encuesta', 
    component: CreateSurveyComponent
  }
];
