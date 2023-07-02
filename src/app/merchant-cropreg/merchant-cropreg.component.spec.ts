import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantCropregComponent } from './merchant-cropreg.component';

describe('MerchantCropregComponent', () => {
  let component: MerchantCropregComponent;
  let fixture: ComponentFixture<MerchantCropregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantCropregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantCropregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
