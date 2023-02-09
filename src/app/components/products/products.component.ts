import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];

  total: number = 0;

  products: Product[] = [];

  today = new Date();
  otherDay = new Date(2023, 2, 1);

  showProductDetails = false;
  productSelected: Product = {
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

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onAddedProduct(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetails() {
    this.showProductDetails = !this.showProductDetails;
  }

  onShowDetails(id: string) {
    this.productsService.getSelectedProduct(id).subscribe((data) => {
      this.toggleProductDetails();
      this.productSelected = data;
    });
  }
}
