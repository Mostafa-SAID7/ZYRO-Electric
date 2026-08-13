import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../models';

@Component({
  selector: 'app-categories-grid',
  templateUrl: './categories-grid.component.html',
  styleUrls: ['./categories-grid.component.scss']
})
export class CategoriesGridComponent {
  @Input() categories: Category[] = [];

  constructor(private router: Router) {}

  goToCategory(category: Category): void {
    this.router.navigate(['/products'], { queryParams: { category: category.id } });
  }
}
