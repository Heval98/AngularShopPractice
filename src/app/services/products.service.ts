import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from '../models/product.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(private http: HttpClient) {}

  getAllProducts(limit?: number, offset?: number) {
    //return this.http.get<Product[]>('https://fakestoreapi.com/products');
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, { params }).pipe(
      retry(3),
      map((products) =>
        products.map((item) => {
          return {
            ...item,
            taxes: 0.19 * item.price,
          };
        })
      )
    );
  }

  getProductsPages(limit: number, offset: number) {
    return this.http.get<Product[]>(this.apiUrl, {
      params: { limit, offset },
    });
  }

  getSelectedProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.Conflict) {
          throw 'Fail to request data';
        }
        throw 'Fail to reach server';
      })
    );
  }

  createProduct(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  updateProduct(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  deleteProduct(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
