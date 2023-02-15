import { Component, EventEmitter, Input, Output } from '@angular/core';

import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/app/models/product.model';

import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  myShoppingCart: Product[] = [];

  total: number = 0;

  @Input() products: Product[] = [];
  @Input()
  set productId(id: string | null) {
    if (id) {
      this.onShowDetails(id);
    }
  }
  @Output() loadMore = new EventEmitter();

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

  limit = 10;
  offset = 0;
  detailStatus: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  onAddedProduct(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetails() {
    this.showProductDetails = !this.showProductDetails;
  }

  onShowDetails(id: string) {
    this.detailStatus = 'loading';
    this.productsService.getSelectedProduct(id).subscribe(
      (data) => {
        // this.toggleProductDetails();
        if (!this.showProductDetails) {
          this.showProductDetails = true;
        }
        this.productSelected = data;
        this.detailStatus = 'success';
      },
      (response) => {
        console.log(response);
        this.detailStatus = 'error';
      }
    );
  }

  sendFakeItem(id: string) {
    this.detailStatus = 'loading';
    this.productsService.getSelectedProduct('2346').subscribe(
      (data) => {
        this.toggleProductDetails();
        this.productSelected = data;
        this.detailStatus = 'success';
      },
      (response) => {
        console.log(response);
        this.detailStatus = 'error';
      }
    );
  }

  createNewProduct() {
    const newProduct: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'Test description',
      images: ['https://placeimg.com/640/480/any'],
      price: 1000,
      categoryId: 2,
    };

    this.productsService.createProduct(newProduct).subscribe((data) => {
      // console.log('Product created: ', data);
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'Nuevo titulo',
    };
    const id = this.productSelected.id;
    this.productsService.updateProduct(id, changes).subscribe((data) => {
      // console.log('Product updated', data);
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productSelected.id
      );
      this.products[productIndex] = data;
    });
  }

  deleteProduct() {
    const id = this.productSelected.id;
    this.productsService.deleteProduct(id).subscribe((data) => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productSelected.id
      );
      this.products.splice(productIndex, 1);
      this.showProductDetails = false;
    });
  }

  onLoadMore() {
    this.loadMore.emit();
  }
}
