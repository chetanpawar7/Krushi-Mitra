import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerOrdersComponent } from './farmer-orders.component';

describe('FarmerOrdersComponent', () => {
  let component: FarmerOrdersComponent;
  let fixture: ComponentFixture<FarmerOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
