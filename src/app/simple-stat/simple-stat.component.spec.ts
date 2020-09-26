import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleStatComponent } from './simple-stat.component';

describe('SimpleStatComponent', () => {
  let component: SimpleStatComponent;
  let fixture: ComponentFixture<SimpleStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
