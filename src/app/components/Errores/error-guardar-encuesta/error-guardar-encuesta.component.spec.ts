import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorGuardarEncuestaComponent } from './error-guardar-encuesta.component';

describe('ErrorGuardarEncuestaComponent', () => {
  let component: ErrorGuardarEncuestaComponent;
  let fixture: ComponentFixture<ErrorGuardarEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorGuardarEncuestaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorGuardarEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
