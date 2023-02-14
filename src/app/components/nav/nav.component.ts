import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { User } from 'src/app/models/user.model';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
    this.getAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
