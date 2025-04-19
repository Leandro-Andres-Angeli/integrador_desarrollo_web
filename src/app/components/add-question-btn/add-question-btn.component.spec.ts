import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionBtnComponent } from './add-question-btn.component';

describe('AddQuestionBtnComponent', () => {
  let component: AddQuestionBtnComponent;
  let fixture: ComponentFixture<AddQuestionBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddQuestionBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuestionBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
