import { Component, signal, computed, inject } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";
import { CourseCardComponent } from "../../ui/course-card/course-card.component";
import { Course } from "../../models/course.model";
import { CourseService } from "../../services/course.service";

@Component({
  selector: "app-student-dashboard",
  standalone: true,
  imports: [CourseCardComponent, RouterLink],
  templateUrl: "./student-dashboard.component.html",
  styleUrl: "./student-dashboard.component.scss",
})
export class StudentDashboardComponent {
  // inject(CourseService) requests the service created in Exercise 6.
  // Angular finds the singleton instance and gives it to us.
  private api = inject(CourseService);

  studentName = signal("Liya Kebede");
  earnedCredits = signal(45);
  graduationStatus = computed(() =>
    this.earnedCredits() >= 120 ? "Eligible for Graduation" : "In Progress",
  );

  registerForClass() {
    this.earnedCredits.update((c) => c + 3);
  }

  selectedCourse = signal<Course | null>(null);

  // rxResource wraps the HTTP call into three managed signals:
  // - coursesResource.isLoading() -> true while waiting for the server response
  // - coursesResource.error()     -> the error object if the request fails
  // - coursesResource.value()     -> the Course[] array when the request succeeds
  //
  // It handles subscribing (starting the request) and unsubscribing (cleaning up) automatically.
  coursesResource = rxResource({
    stream: () => this.api.getAll(),
  });

  handleEnroll(course: Course) {
    this.selectedCourse.set(course);
    console.log('Enrollment requested for:', course.title);
  }
}