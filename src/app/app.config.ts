import { ApplicationConfig, provideZonelessChangeDetection } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import {
  provideHttpClient,
  withInterceptors,
  withXsrfConfiguration,
} from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { routes } from "./app.routes";
import { jwtInterceptor } from "./interceptors/jwt.interceptor";
import { credentialsInterceptor } from "./interceptors/credentials.interceptor";
import { errorInterceptor } from "./interceptors/error.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      // Order: attach auth token & credentials first, then handle error responses
      withInterceptors([jwtInterceptor, credentialsInterceptor, errorInterceptor]),
      // Reads the XSRF-TOKEN cookie set by .NET and echoes it in the X-XSRF-TOKEN header
      withXsrfConfiguration({
        cookieName: "XSRF-TOKEN",
        headerName: "X-XSRF-TOKEN",
      })
    ),
    provideAnimationsAsync(),
  ],
};