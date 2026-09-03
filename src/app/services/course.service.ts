import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Course, CourseDetail, PagedResponse } from '../models/course.model';

// @Injectable({ providedIn: 'root' }) registers a single shared instance across the app —
// equivalent to AddSingleton<T>() in .NET's DI container.
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);

  // Reads the base URL from the environment file so no URLs are hardcoded in source.
  // Development: proxied to http://localhost:5003/api/v1/courses via proxy.conf.json
  // Production:  resolved against the deployed origin
  private readonly base = `${environment.apiUrl}/courses`;

  getAll(page = 1, pageSize = 50) {
    return this.http
      .get<PagedResponse<Course>>(this.base, {
        params: { page: page.toString(), pageSize: pageSize.toString() },
      })
      .pipe(map(response => response.items));
  }

  getById(id: string) {
    return this.http.get<CourseDetail>(`${this.base}/${id}`);
  }

  delete(id: number) {
    // DELETE /api/v1/courses/:id
    // XSRF-TOKEN header is added automatically by the Angular withXsrfConfiguration feature.
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
