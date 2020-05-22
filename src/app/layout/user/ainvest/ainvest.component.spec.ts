import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AinvestComponent } from './ainvest.component';

describe('AinvestComponent', () => {
  let component: AinvestComponent;
  let fixture: ComponentFixture<AinvestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AinvestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AinvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
