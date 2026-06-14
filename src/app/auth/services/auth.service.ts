import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.loadFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(!!this.loadFromStorage());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  login(credentials: LoginRequest): Observable<User> {
    return new Observable(observer => {
      setTimeout(() => {
        // Mock user data - replace with real API call
        const mockUser: User = {
          id: '1',
          email: credentials.email,
          name: credentials.email.split('@')[0],
          phone: '+1234567890',
          address: '123 Main St',
          token: 'mock_token_' + Math.random().toString(36).substr(2, 9)
        };
        this.setCurrentUser(mockUser);
        observer.next(mockUser);
        observer.complete();
      }, 500);
    });
  }

  register(data: RegisterRequest): Observable<User> {
    return new Observable(observer => {
      if (data.password !== data.confirmPassword) {
        observer.error('Passwords do not match');
        return;
      }

      setTimeout(() => {
        const mockUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email: data.email,
          name: data.name,
          phone: data.phone,
          address: data.address,
          token: 'mock_token_' + Math.random().toString(36).substr(2, 9)
        };
        this.setCurrentUser(mockUser);
        observer.next(mockUser);
        observer.complete();
      }, 500);
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  private setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private loadFromStorage(): User | null {
    try {
      const stored = localStorage.getItem('currentUser');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }
}
