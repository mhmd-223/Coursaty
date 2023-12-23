import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Interest, Role, User } from '../models/user.model';
import { InMemoryDataService } from './memorydata.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'api/users';
  private readonly USER_DATA_KEY = 'user';
  private readonly IS_LOGGED_IN_KEY = 'isLoggedIn';

  constructor(private http: HttpClient, private inMemoryService: InMemoryDataService, private userServ: UserService) { }

  // login(email: string, password: string): Observable<User | null> {
  //   const credentials = { email, password };
  //   return this.http.post<User>(`${this.apiUrl}/login`, credentials)
  //     .pipe(
  //       tap((response) => { if (response !== null) this.storeUserInSession(response) }),
  //       catchError(this.handleError<User>('login')),
  //     );
  // }


  login(email: string, password: string): Observable<User | null> {
    const user = this.inMemoryService.createDb().users.find(
      (u) => u.email === email && u.password === password
    ) || null;

    // Simulate an HTTP request delay
    const delayTime = 1000;
    return of(user).pipe(
      // delay(delayTime), // Simulate network delay
      tap((response) => this.handleLoginResponse(response)),
      catchError(this.handleError<User>('login'))
    );
  }

  private handleLoginResponse(user: User | null): void {
    if (user) {
      this.storeUserInSession(user);
    }
  }


  storeUserInSession(user: User): void {
    sessionStorage.setItem(this.USER_DATA_KEY, JSON.stringify(user));
    sessionStorage.setItem(this.IS_LOGGED_IN_KEY, JSON.stringify(true));
  }

  getUserData(): User | null {
    const userDataString = sessionStorage.getItem(this.USER_DATA_KEY);
    return userDataString ? JSON.parse(userDataString) : null;
  }

  clearUserData(): void {
    sessionStorage.removeItem(this.USER_DATA_KEY);
    sessionStorage.removeItem(this.IS_LOGGED_IN_KEY);
  }


  signup(user: User): Observable<User | null | string> {
    return this.userServ.addUser(user);
  }

  logout(): void {
    this.clearUserData()
  }

  isAuthenticated(): boolean {
    const isLoggedInString = sessionStorage.getItem(this.IS_LOGGED_IN_KEY);

    if (isLoggedInString !== null && isLoggedInString !== undefined) {
      return isLoggedInString === 'true';
    }
    return false;
  }


  // Other authentication-related methods

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
