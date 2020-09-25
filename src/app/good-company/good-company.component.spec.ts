import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodCompanyComponent } from './good-company.component';

describe('GoodCompanyComponent', () => {
  let component: GoodCompanyComponent;
  let fixture: ComponentFixture<GoodCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
