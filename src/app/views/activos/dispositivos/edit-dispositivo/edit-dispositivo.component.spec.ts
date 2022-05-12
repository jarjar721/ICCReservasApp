import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDispositivoComponent } from './edit-dispositivo.component';

describe('EditDispositivoComponent', () => {
  let component: EditDispositivoComponent;
  let fixture: ComponentFixture<EditDispositivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDispositivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDispositivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
