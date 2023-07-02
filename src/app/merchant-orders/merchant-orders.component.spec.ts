import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantOrdersComponent } from './merchant-orders.component';

describe('MerchantOrdersComponent', () => {
  let component: MerchantOrdersComponent;
  let fixture: ComponentFixture<MerchantOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
