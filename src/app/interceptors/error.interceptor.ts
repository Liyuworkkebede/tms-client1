import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

/**
 * Globally catches HTTP errors and extracts the RFC 7807 ProblemDetails
 * `detail` property emitted by the .NET API.
 *
 * - 401 Unauthorized → redirect to /login (session expired or missing cookie)
 * - All others       → log the structured detail message to the console
 *
 * The error is always re-thrown so individual callers can handle it too.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // Pull the C# ProblemDetails `detail` field, fall back to a generic message
      const detailMessage =
        err.error?.detail ?? 'A system error occurred. Please try again.';

      if (err.status === 401) {
        // Session expired or unauthenticated — send user back to login
        router.navigate(['/login']);
      } else {
        // Surface the structured server message for UI notification / debugging
        console.error('API Error Response:', detailMessage);
      }

      // Re-throw so individual components/stores can react if needed
      return throwError(() => err);
    })
  );
};
