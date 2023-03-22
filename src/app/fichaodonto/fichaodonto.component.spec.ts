import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaodontoComponent } from './fichaodonto.component';

describe('FichaodontoComponent', () => {
  let component: FichaodontoComponent;
  let fixture: ComponentFixture<FichaodontoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaodontoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaodontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
