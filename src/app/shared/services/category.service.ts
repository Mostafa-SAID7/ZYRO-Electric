import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../../models';

// Single Responsibility: Handle category operations only
@Injectable({ providedIn: 'root' })
export class CategoryService {
  private mockCategories: Category[] = [
    { id: 'smartphone-accessories', name: 'Smartphone Accessories', icon: 'smartphone' },
    { id: 'laptop-accessories', name: 'Laptop Accessories', icon: 'laptop' },
    { id: 'gaming-gear', name: 'Gaming Gear', icon: 'gamepad' },
    { id: 'audio', name: 'Audio & Headphones', icon: 'headphones' },
    { id: 'cameras', name: 'Cameras & Photography', icon: 'camera' },
    { id: 'smart-home', name: 'Smart Home', icon: 'home' }
  ];

  private categoriesSubject = new BehaviorSubject<Category[]>(this.mockCategories);
  categories$ = this.categoriesSubject.asObservable();

  getAll(): Observable<Category[]> {
    return this.categories$;
  }

  getById(categoryId: string): Category | undefined {
    return this.mockCategories.find(c => c.id === categoryId);
  }

  search(query: string): Observable<Category[]> {
    const filtered = this.mockCategories.filter(c =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
    return new Observable(observer => {
      observer.next(filtered);
      observer.complete();
    });
  }

  addCategory(category: Omit<Category, 'id'>): void {
    const newCategory: Category = {
      ...category,
      id: Math.random().toString(36).substr(2, 9)
    };
    this.mockCategories.push(newCategory);
    this.categoriesSubject.next(this.mockCategories);
  }

  updateCategory(id: string, updates: Partial<Category>): void {
    const index = this.mockCategories.findIndex(c => c.id === id);
    if (index !== -1) {
      this.mockCategories[index] = { ...this.mockCategories[index], ...updates };
      this.categoriesSubject.next(this.mockCategories);
    }
  }

  deleteCategory(id: string): void {
    this.mockCategories = this.mockCategories.filter(c => c.id !== id);
    this.categoriesSubject.next(this.mockCategories);
  }
}
