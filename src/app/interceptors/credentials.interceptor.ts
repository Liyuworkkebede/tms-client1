import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Attaches `withCredentials: true` to every outgoing HTTP request so the
 * browser includes the HttpOnly `tms_auth` cookie automatically.
 * Registered globally in app.config.ts via withInterceptors([]).
 */
export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req.clone({ withCredentials: true }));
};
