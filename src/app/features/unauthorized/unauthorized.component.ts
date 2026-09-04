import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tms-unauthorized',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="unauthorized-container">
      <div class="card">
        <h1 class="error-code">403</h1>
        <h2>Access Denied</h2>
        <p>You do not have the required permissions to access this resource.</p>
        <div class="actions">
          <a routerLink="/dashboard" class="btn-primary">Return to Dashboard</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 70vh;
      padding: 1.5rem;
    }
    .card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 2.5rem;
      max-width: 480px;
      text-align: center;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .error-code {
      font-size: 4rem;
      font-weight: 800;
      color: #dc2626;
      margin: 0;
      line-height: 1;
    }
    h2 {
      font-size: 1.5rem;
      color: #1e293b;
      margin-top: 0.75rem;
    }
    p {
      color: #64748b;
      margin: 1rem 0 1.5rem 0;
    }
    .btn-primary {
      display: inline-block;
      padding: 0.6rem 1.25rem;
      background-color: #2563eb;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
    }
    .btn-primary:hover {
      background-color: #1d4ed8;
    }
  `]
})
export class UnauthorizedComponent {}
