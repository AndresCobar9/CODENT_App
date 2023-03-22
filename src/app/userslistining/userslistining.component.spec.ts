import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserslistiningComponent } from './userslistining.component';

describe('UserslistiningComponent', () => {
  let component: UserslistiningComponent;
  let fixture: ComponentFixture<UserslistiningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserslistiningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserslistiningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
