import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcropComponent } from './addcrop.component';

describe('AddcropComponent', () => {
  let component: AddcropComponent;
  let fixture: ComponentFixture<AddcropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
