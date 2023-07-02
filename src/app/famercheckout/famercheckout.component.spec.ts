import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamercheckoutComponent } from './famercheckout.component';

describe('FamercheckoutComponent', () => {
  let component: FamercheckoutComponent;
  let fixture: ComponentFixture<FamercheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamercheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamercheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
