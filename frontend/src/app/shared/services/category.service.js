
import { BehaviorSubject, Observable } from 'rxjs';


// Single Responsibility: Handle category operations only
@Injectable({ providedIn: 'root' })
export class CategoryService {constructor() { CategoryService.prototype.__init.call(this);CategoryService.prototype.__init2.call(this);CategoryService.prototype.__init3.call(this); }
   __init() {this.mockCategories = [
    { id: 'smartphone-accessories', name: 'Smartphone Accessories', icon: 'smartphone', productCount: 0 },
    { id: 'laptop-accessories', name: 'Laptop Accessories', icon: 'laptop', productCount: 0 },
    { id: 'gaming-gear', name: 'Gaming Gear', icon: 'gamepad', productCount: 0 },
    { id: 'audio', name: 'Audio & Headphones', icon: 'headphones', productCount: 0 },
    { id: 'cameras', name: 'Cameras & Photography', icon: 'camera', productCount: 0 },
    { id: 'smart-home', name: 'Smart Home', icon: 'home', productCount: 0 }
  ]}

   __init2() {this.categoriesSubject = new BehaviorSubject(this.mockCategories)}
  __init3() {this.categories$ = this.categoriesSubject.asObservable()}

  getAll() {
    return this.categories$;
  }

  getById(categoryId) {
    return this.mockCategories.find(c => c.id === categoryId);
  }

  search(query) {
    const filtered = this.mockCategories.filter(c =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
    return new Observable(observer => {
      observer.next(filtered);
      observer.complete();
    });
  }

  addCategory(category) {
    const newCategory = {
      ...category,
      id: Math.random().toString(36).substr(2, 9)
    };
    this.mockCategories.push(newCategory);
    this.categoriesSubject.next(this.mockCategories);
  }

  updateCategory(id, updates) {
    const index = this.mockCategories.findIndex(c => c.id === id);
    if (index !== -1) {
      this.mockCategories[index] = { ...this.mockCategories[index], ...updates };
      this.categoriesSubject.next(this.mockCategories);
    }
  }

  deleteCategory(id) {
    this.mockCategories = this.mockCategories.filter(c => c.id !== id);
    this.categoriesSubject.next(this.mockCategories);
  }
}
