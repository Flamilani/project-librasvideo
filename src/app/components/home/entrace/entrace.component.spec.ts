import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntraceComponent } from './entrace.component';

describe('EntraceComponent', () => {
  let component: EntraceComponent;
  let fixture: ComponentFixture<EntraceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntraceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
