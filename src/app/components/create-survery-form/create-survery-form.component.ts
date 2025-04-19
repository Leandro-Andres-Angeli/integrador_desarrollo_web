import { Component, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddQuestionBtnComponent } from '../add-question-btn/add-question-btn.component';
import { AddQuestionModalComponent } from '../add-question-modal/add-question-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-survery-form',
  imports: [RouterLink , AddQuestionBtnComponent , AddQuestionModalComponent],
  templateUrl: './create-survery-form.component.html',
  styleUrl: './create-survery-form.component.scss'
})
export class CreateSurveryFormComponent {
   constructor (){}
   triggerOpenModal : boolean  = false
  openModal(){
     this.triggerOpenModal = true
    
  }

}
