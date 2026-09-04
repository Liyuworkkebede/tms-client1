import { Routes } from "@angular/router";
import { roleGuard } from "./guards/role.guard";

export const routes: Routes = [
  {
    path: "dashboard",
    loadComponent: () =>
      import("./features/instructor-dashboard/instructor-dashboard.component").then(
        (m) => m.InstructorDashboardComponent,
      ),
  },
  {
    path: "grade-submission",
    loadComponent: () =>
      import("./features/grade-submission/grade-submission.component").then(
        (m) => m.GradeSubmissionComponent,
      ),
    canActivate: [roleGuard("Instructor")],
  },
  {
    path: "student-dashboard",
    loadComponent: () =>
      import("./features/student-dashboard/student-dashboard.component").then(
        (m) => m.StudentDashboardComponent,
      ),
  },
  {
    path: "enrollments",
    loadComponent: () =>
      import("./features/enrollment-list/enrollment-list.component").then(
        (m) => m.EnrollmentListComponent,
      ),
  },
  {
    path: "courses/:id",
    loadComponent: () =>
      import("./features/course-detail/course-detail.component").then(
        (m) => m.CourseDetailComponent,
      ),
  },
  {
    path: "enroll",
    loadComponent: () =>
      import("./features/enrollment-form/enrollment-form.component").then(
        (m) => m.EnrollmentFormComponent,
      ),
  },
  {
    path: "unauthorized",
    loadComponent: () =>
      import("./features/unauthorized/unauthorized.component").then(
        (m) => m.UnauthorizedComponent,
      ),
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
];
