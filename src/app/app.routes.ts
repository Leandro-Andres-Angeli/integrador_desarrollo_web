import { Routes } from '@angular/router';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { CreateSurveyComponent } from './views/create-survey/create-survey.component';
import { HomeComponent } from './views/home/home.component';

export const routes: Routes = [
  { 
    path: '', 
    
    pathMatch: 'full', 
    component : HomeComponent
  },
  
];
