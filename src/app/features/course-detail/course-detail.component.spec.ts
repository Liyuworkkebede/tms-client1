import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseDetailComponent } from './course-detail.component';
import { provideRouter } from '@angular/router';
import { ComponentRef } from '@angular/core';

describe('CourseDetailComponent', () => {
  let component: CourseDetailComponent;
  let componentRef: ComponentRef<CourseDetailComponent>;
  let fixture: ComponentFixture<CourseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDetailComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDetailComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('id', '1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
