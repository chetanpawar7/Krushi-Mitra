import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KrishiOrdersComponent } from './krishi-orders.component';

describe('KrishiOrdersComponent', () => {
  let component: KrishiOrdersComponent;
  let fixture: ComponentFixture<KrishiOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KrishiOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KrishiOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
