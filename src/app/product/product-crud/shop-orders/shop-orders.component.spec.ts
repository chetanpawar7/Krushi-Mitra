import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopOrdersComponent } from './shop-orders.component';

describe('ShopOrdersComponent', () => {
  let component: ShopOrdersComponent;
  let fixture: ComponentFixture<ShopOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
