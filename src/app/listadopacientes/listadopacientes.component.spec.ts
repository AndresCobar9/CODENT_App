import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadopacientesComponent } from './listadopacientes.component';

describe('ListadopacientesComponent', () => {
  let component: ListadopacientesComponent;
  let fixture: ComponentFixture<ListadopacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadopacientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadopacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
