import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TmsUser {
  displayName: string;
  role: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  // Signal holds the authenticated user, or null when no session exists.
  // Components read currentUser() reactively — no Subject/BehaviorSubject needed.
  currentUser = signal<TmsUser | null>(null);

  /** Returns true when the current user holds the requested role or is an Admin. */
  hasRole(role: string): boolean {
    const user = this.currentUser();
    return user?.role === role || user?.role === 'Admin';
  }

  /**
   * Sends credentials to /auth/login.
   * The server sets the HttpOnly `tms_auth` cookie in the Set-Cookie header —
   * the browser stores it automatically, invisible to JavaScript.
   * A follow-up GET /auth/me fetches the user profile using that cookie.
   */
  async login(credentials: LoginRequest): Promise<void> {
    // Step 1: authenticate — server sets HttpOnly cookie
    await firstValueFrom(
      this.http.post<void>(`${environment.apiUrl}/auth/login`, credentials)
    );

    // Step 2: fetch profile — browser sends the cookie automatically
    const user = await firstValueFrom(
      this.http.get<TmsUser>(`${environment.apiUrl}/auth/me`)
    );

    this.currentUser.set(user);
  }

  /** Clears local session state. Full server-side logout (cookie revocation) added in Module 12. */
  logout(): void {
    this.currentUser.set(null);
  }
}
