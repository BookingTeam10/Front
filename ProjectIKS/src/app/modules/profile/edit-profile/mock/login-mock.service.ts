// MockLoginService.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockLoginService {
  private role: string | undefined;
  private username: string | undefined;

  setRole(role: string): void {
    this.role = role;
  }

  getRole(): string | undefined {
    return this.role;
  }

  setUsername(username: string): void {
    this.username = username;
  }

  getUsername(): string | undefined {
    return this.username;
  }
}
