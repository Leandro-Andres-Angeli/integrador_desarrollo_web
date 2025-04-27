import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';


@Component({
  selector: 'app-create-survey',
  imports: [NavbarComponent],
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.scss'
})
export class CreateSurveyComponent {
 handleSubmit(e : Event){
  e.preventDefault()
  console.log("prevented")
 }
}
