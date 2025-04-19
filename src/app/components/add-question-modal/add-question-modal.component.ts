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
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-question-modal',
  imports: [JsonPipe],
  templateUrl: './add-question-modal.component.html',
  styleUrl: './add-question-modal.component.scss',
})
export class AddQuestionModalComponent {
  @Input() openModal: boolean = false;

  @Output() resetOpenModal = new EventEmitter<boolean>();
  openedModal?: NgbModalRef;
  openedModalSubs?: Subscription;
  @ViewChild('content') modalContent!: ElementRef;
  constructor(private modalService: NgbModal) {}

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
