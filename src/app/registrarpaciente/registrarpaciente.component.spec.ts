import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarpacienteComponent } from './registrarpaciente.component';

describe('RegistrarpacienteComponent', () => {
  let component: RegistrarpacienteComponent;
  let fixture: ComponentFixture<RegistrarpacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarpacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarpacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
