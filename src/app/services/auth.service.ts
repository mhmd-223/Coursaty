import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = environment.apiUrl;
  private readonly USER_KEY = 'user';
  private readonly IS_LOGGED_IN_KEY = 'isLoggedIn';


  constructor(private http: HttpClient, private userServ: UserService) { }

  login(email: string, password: string) {
    email = email.trim()
    password = password.trim()
    const credentials = { email, password };
    return this.http.post<any>(`${this.apiUrl}/user/login`, credentials)
      .pipe(
        tap((response) => {
          if (response && response !== null) {
            this.storeUserInSession(response.data)
          }
        }),
        catchError(this.handleError<User>('login')),
      );
  }



  storeUserInSession(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    localStorage.setItem(this.IS_LOGGED_IN_KEY, JSON.stringify(true));
  }

  getUserData(): User | null {
    const userString = localStorage.getItem(this.USER_KEY);
    return userString ? JSON.parse(userString) : null;
  }

  clearUserData(): void {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.IS_LOGGED_IN_KEY);
  }


  signup(user: any): Observable<User | null> {
    return this.http.post<any>(`${this.apiUrl}/user/register`, user).pipe(
      map(response => {
        // Handle successful response
        console.log('User successfully registered:', response.data);
        this.storeUserInSession(response.data);
        this.refetch()
        return this.getUserData();
      }),
      catchError(error => {
        // Handle errors
        console.error('Error registering user:', error);
        return of(null);
      })
    );
  }

  refetch() {
    this.userServ.getUserById(this.getUserData()?.id).subscribe(
      res => this.storeUserInSession(res.data)
    )
   }


  logout(): void {
    this.clearUserData()
  }

  isAuthenticated(): boolean {
    const loggedInString = localStorage.getItem(this.IS_LOGGED_IN_KEY)
    return loggedInString ? JSON.parse(loggedInString): false;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
