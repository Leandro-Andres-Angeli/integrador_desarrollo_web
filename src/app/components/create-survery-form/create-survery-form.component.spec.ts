import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSurveryFormComponent } from './create-survery-form.component';

describe('CreateSurveryFormComponent', () => {
  let component: CreateSurveryFormComponent;
  let fixture: ComponentFixture<CreateSurveryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSurveryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSurveryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
