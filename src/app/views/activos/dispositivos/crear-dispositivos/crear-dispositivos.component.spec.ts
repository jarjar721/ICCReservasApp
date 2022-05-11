import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDispositivosComponent } from './crear-dispositivos.component';

describe('CrearDispositivosComponent', () => {
  let component: CrearDispositivosComponent;
  let fixture: ComponentFixture<CrearDispositivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearDispositivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearDispositivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
