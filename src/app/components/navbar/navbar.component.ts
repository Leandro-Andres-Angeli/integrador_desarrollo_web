import { Component, ElementRef, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input()
 surveyForm!  : HTMLFormElement
 handleFormSubmit(){
  console.log(this.surveyForm)
 }
}
