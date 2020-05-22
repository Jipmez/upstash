import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdcontentComponent } from './adcontent.component';

describe('AdcontentComponent', () => {
  let component: AdcontentComponent;
  let fixture: ComponentFixture<AdcontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdcontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
