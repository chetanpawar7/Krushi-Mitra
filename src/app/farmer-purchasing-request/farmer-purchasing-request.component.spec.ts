import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerPurchasingRequestComponent } from './farmer-purchasing-request.component';

describe('FarmerPurchasingRequestComponent', () => {
  let component: FarmerPurchasingRequestComponent;
  let fixture: ComponentFixture<FarmerPurchasingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerPurchasingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerPurchasingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
