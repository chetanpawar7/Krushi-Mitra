import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopownerComponent } from './shopowner.component';

describe('ShopownerComponent', () => {
  let component: ShopownerComponent;
  let fixture: ComponentFixture<ShopownerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopownerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
