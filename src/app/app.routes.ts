import { Routes } from '@angular/router';

import { CreateSurveyComponent } from './views/create-survey/create-survey.component';
import { HomeComponent } from './views/home/home.component';

export const routes: Routes = [
  { 
    path: '', 
    
    pathMatch: 'full', 
    component : HomeComponent
  },
  { 
    path:"crear-encuesta",
    component : CreateSurveyComponent
  }
  
];
