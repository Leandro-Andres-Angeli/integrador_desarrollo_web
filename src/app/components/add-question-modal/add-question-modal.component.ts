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
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  formChangesSub?  : Subscription; 
  surveyState? : string ;
    addQuestionForm = new FormGroup< {question : FormControl<string | null> , "answer-type" : FormControl<string | null>,"selection-type"?:FormControl<string | null> , options?:FormArray}>({
       question : new FormControl("" , [Validators.required]),
       "answer-type" : new FormControl("0"),
     
     "selection-type" : new FormControl(""),
 
  })
 
  @ViewChild('content') modalContent!: ElementRef;

  constructor(private modalService: NgbModal) {}
   ngOnInit(){
    this.addQuestionForm.valueChanges.subscribe((res)=> {
      this.surveyState = JSON.stringify(res)
    })
   this.formChangesSub =  this.addQuestionForm.get("answer-type")?.valueChanges.subscribe((res)=> {
        console.log("value change"),
        console.log(res)
        
        if(res ==="0"){
           this.addQuestionForm.removeControl("selection-type")
           this.addQuestionForm.removeControl("options")
        }
        else {
          this.addQuestionForm.addControl("options",new FormArray([new FormControl("option one")]) )
          this.addQuestionForm.addControl("selection-type" , new FormControl())
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
  handleAddOption(el : HTMLInputElement){
     const formArray =  this.addQuestionForm.get("options") as FormArray
    
     formArray.push(new FormControl(el.value))
     el.value = ''
  }
  handleRemoveFormArray(idx : number){
    const formArray =  this.addQuestionForm.get("options") as FormArray
    formArray.removeAt(idx)
  }
  ngOnDestroy() {
    this.openedModalSubs?.unsubscribe();
    this.formChangesSub?.unsubscribe()
  }
}
