import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesIndexComponent } from './movies-index.component';

describe('MoviesIndexComponent', () => {
  let component: MoviesIndexComponent;
  let fixture: ComponentFixture<MoviesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
