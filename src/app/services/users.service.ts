import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, CreateUserDTO } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'https://damp-spire-59848.herokuapp.com/api/users';

  constructor(private http: HttpClient) {}

  createUser(dto: CreateUserDTO) {
    return this.http.post<User>(this.apiUrl, dto);
  }

  GetAllUsers() {
    return this.http.get<User>(this.apiUrl);
  }
}
