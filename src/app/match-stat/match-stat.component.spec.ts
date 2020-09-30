import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchStatComponent } from './match-stat.component';

describe('MatchStatComponent', () => {
  let component: MatchStatComponent;
  let fixture: ComponentFixture<MatchStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
