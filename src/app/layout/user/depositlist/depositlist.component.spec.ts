import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositlistComponent } from './depositlist.component';

describe('DepositlistComponent', () => {
  let component: DepositlistComponent;
  let fixture: ComponentFixture<DepositlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
