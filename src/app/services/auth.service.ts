import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';
import { switchMap, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://damp-spire-59848.herokuapp.com/api/auth';
  private user = new BehaviorSubject<User | null>(null);

  user$ = this.user.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    return this.http
      .post<Auth>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          console.log('test');
          this.tokenService.saveToken(response.access_token);
        })
      );
  }

  profile() {
    return this.http
      .get<User>(
        `${this.apiUrl}/profile`
        // {
        //   headers: {
        //     Authorization: `Bearer ${this.tokenService.getToken()}`,
        //     'Content-type': 'application/json',
        //   },
        // }
      )
      .pipe(tap((user) => this.user.next(user)));
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password).pipe(switchMap(() => this.profile()));
  }

  logout() {
    this.tokenService.removeToken();
  }
}
