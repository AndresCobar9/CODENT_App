import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteInfoComponent } from './paciente-info.component';

describe('PacienteInfoComponent', () => {
  let component: PacienteInfoComponent;
  let fixture: ComponentFixture<PacienteInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
