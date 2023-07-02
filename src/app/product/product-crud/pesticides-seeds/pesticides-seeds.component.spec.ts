import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesticidesSeedsComponent } from './pesticides-seeds.component';

describe('PesticidesSeedsComponent', () => {
  let component: PesticidesSeedsComponent;
  let fixture: ComponentFixture<PesticidesSeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesticidesSeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesticidesSeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
