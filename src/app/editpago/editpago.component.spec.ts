import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpagoComponent } from './editpago.component';

describe('EditpagoComponent', () => {
  let component: EditpagoComponent;
  let fixture: ComponentFixture<EditpagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditpagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditpagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
