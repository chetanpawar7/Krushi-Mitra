import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantSellingComponent } from './merchant-selling.component';

describe('MerchantSellingComponent', () => {
  let component: MerchantSellingComponent;
  let fixture: ComponentFixture<MerchantSellingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantSellingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
