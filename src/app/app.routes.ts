import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { CreateSurveyComponent } from './views/create-survey/create-survey.component';
import { NotFound404Component } from './views/not-found404/not-found404.component';

export const routes: Routes = [{
    path:"" , 
    pathMatch:'full',
    component:HomeComponent
} , {
    path:"encuesta",
    component:CreateSurveyComponent

    
},{
    path:"**",
    component:NotFound404Component
}];
