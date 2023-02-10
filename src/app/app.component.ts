import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  img = '';
  showImage = true;
  token = '';

  constructor(
    private AuthService: AuthService,
    private UsersService: UsersService
  ) {}

  onLoaded(img: string) {
    console.log('Log padre', img);
  }

  toggleImg() {
    this.showImage = !this.showImage;
  }

  createUser() {
    this.UsersService.createUser({
      name: 'Juan',
      email: 'juan@mail.com',
      password: '12345',
    }).subscribe((rta) => {
      console.log(rta);
    });
  }

  login() {
    this.AuthService.login('juan@mail.com', '12345').subscribe((rta) => {
      console.log(rta.access_token);
      this.token = rta.access_token;
    });
  }

  // getProfile() {
  //   this.AuthService.profile
  // }
}
