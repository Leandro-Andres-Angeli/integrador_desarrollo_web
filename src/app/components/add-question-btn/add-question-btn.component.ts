import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-question-btn',
  imports: [],
  templateUrl: './add-question-btn.component.html',
  styleUrl: './add-question-btn.component.scss'
})
export class AddQuestionBtnComponent {
 @Output() triggerOpenModal = new EventEmitter<boolean>(true)

 
}
