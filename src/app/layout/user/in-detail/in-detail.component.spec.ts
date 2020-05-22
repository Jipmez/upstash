import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InDetailComponent } from './in-detail.component';

describe('InDetailComponent', () => {
  let component: InDetailComponent;
  let fixture: ComponentFixture<InDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
