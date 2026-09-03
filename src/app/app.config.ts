import { ApplicationConfig, provideZonelessChangeDetection } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import {
  provideHttpClient,
  withInterceptors,
  withXsrfConfiguration,
} from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { routes } from "./app.routes";
import { credentialsInterceptor } from "./interceptors/credentials.interceptor";
import { errorInterceptor } from "./interceptors/error.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      // Order matters: credentials first (attaches cookie), then error handler.
      withInterceptors([credentialsInterceptor, errorInterceptor]),
      // Reads the XSRF-TOKEN cookie set by .NET and echoes it in the
      // X-XSRF-TOKEN header on all mutating requests (POST, PUT, DELETE).
      withXsrfConfiguration({
        cookieName: "XSRF-TOKEN",    // Must match the cookie name in Program.cs
        headerName: "X-XSRF-TOKEN",  // Must match options.HeaderName in AddAntiforgery
      })
    ),
    provideAnimationsAsync(),
  ],
};