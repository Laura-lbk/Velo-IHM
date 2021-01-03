import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeniveleComponent } from './denivele.component';

describe('DeniveleComponent', () => {
  let component: DeniveleComponent;
  let fixture: ComponentFixture<DeniveleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeniveleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeniveleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
