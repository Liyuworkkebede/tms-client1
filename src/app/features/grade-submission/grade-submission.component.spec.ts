import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GradeSubmissionComponent } from './grade-submission.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('GradeSubmissionComponent', () => {
  let component: GradeSubmissionComponent;
  let fixture: ComponentFixture<GradeSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeSubmissionComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimationsAsync(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GradeSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
