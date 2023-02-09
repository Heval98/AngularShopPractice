import { Component } from '@angular/core';

import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  img = '';
  showImage = true;

  onLoaded(img: string) {
    console.log('Log padre', img);
  }

  toggleImg() {
    this.showImage = !this.showImage;
  }
}
