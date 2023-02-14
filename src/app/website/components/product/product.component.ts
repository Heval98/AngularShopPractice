import { outputAst } from '@angular/compiler';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    description: '',
    category: {
      id: '',
      name: '',
    },
  };
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() detailedProduct = new EventEmitter<string>();

  addToCart() {
    this.addedProduct.emit(this.product);
  }

  showDetails() {
    this.detailedProduct.emit(this.product.id);
  }
}
