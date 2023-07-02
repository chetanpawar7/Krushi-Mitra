import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KrishiCheckoutComponent } from './krishi-checkout.component';

describe('KrishiCheckoutComponent', () => {
  let component: KrishiCheckoutComponent;
  let fixture: ComponentFixture<KrishiCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KrishiCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KrishiCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
