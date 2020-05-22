import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletrxComponent } from './walletrx.component';

describe('WalletrxComponent', () => {
  let component: WalletrxComponent;
  let fixture: ComponentFixture<WalletrxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletrxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletrxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
