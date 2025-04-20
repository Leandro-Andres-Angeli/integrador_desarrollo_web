import { JsonPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-question-modal',
  imports: [JsonPipe , ReactiveFormsModule],
  templateUrl: './add-question-modal.component.html',
  styleUrl: './add-question-modal.component.scss',
})
export class AddQuestionModalComponent {
  @Input() openModal: boolean = false;

  @Output() resetOpenModal = new EventEmitter<boolean>();
  openedModal?: NgbModalRef;
  openedModalSubs?: Subscription;
    addQuestionForm = new FormGroup({
   question : new FormControl(""),
    "answer-type" : new FormControl("0"),
    "selection-type" : new FormControl("")
  })
  @ViewChild('content') modalContent!: ElementRef;

  constructor(private modalService: NgbModal) {}
   ngOnInit(){
    this.addQuestionForm.valueChanges.subscribe((res)=> {
      console.log("value change"),
      console.log(res)
      if(res['answer-type']==="0"){
        
      }
    })
   }
  ngOnChanges() {
    console.log(this.openModal);
    if (this.openModal) {
      this.openedModal = this.modalService.open(this.modalContent);
      this.openedModalSubs = this.openedModal?.dismissed.subscribe(() => {
        return this.resetOpenModal.emit(false);
      });

  
    }
  }
  ngOnDestroy() {
    this.openedModalSubs?.unsubscribe();
  }
}
