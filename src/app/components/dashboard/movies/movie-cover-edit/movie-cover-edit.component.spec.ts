import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCoverEditComponent } from './movie-cover-edit.component';

describe('MovieCoverEditComponent', () => {
  let component: MovieCoverEditComponent;
  let fixture: ComponentFixture<MovieCoverEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieCoverEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCoverEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
