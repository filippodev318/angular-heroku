import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AroundmeComponent } from './aroundme.component';

describe('AroundmeComponent', () => {
  let component: AroundmeComponent;
  let fixture: ComponentFixture<AroundmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AroundmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AroundmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
