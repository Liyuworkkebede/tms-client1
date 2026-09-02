import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseCardComponent } from './course-card.component';
import { ComponentRef } from '@angular/core';
import { Course } from '../../models/course.model';
import { provideRouter } from '@angular/router';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let componentRef: ComponentRef<CourseCardComponent>;
  let fixture: ComponentFixture<CourseCardComponent>;

  const mockCourse: Course = {
    id: 1,
    title: 'Test Course',
    code: 'TEST-101',
    maxCapacity: 30,
    enrollmentCount: 10,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('course', mockCourse);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
