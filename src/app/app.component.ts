import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  img = '';
  showImage = true;
  token = '';
  imgRta = '';

  constructor(
    private AuthService: AuthService,
    private UsersService: UsersService,
    private fileService: FilesService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (token) {
      this.AuthService.profile().subscribe();
    }
  }

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
      role: 'customer',
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

  getProfile() {
    this.AuthService.profile().subscribe((profile) => {
      console.log(profile);
    });
  }

  downloadPDF() {
    this.fileService.getFile('My PDF', '', 'application/pdf').subscribe();
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.fileService.uploadFile(file).subscribe((rta) => {
        this.imgRta = rta.location;
      });
    }
  }
}
