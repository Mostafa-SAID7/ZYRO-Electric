import { inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-categories-grid',
  templateUrl: './categories-grid.component.html',
  styleUrls: ['./categories-grid.component.scss']
})
export class CategoriesGridComponent {constructor() { CategoriesGridComponent.prototype.__init.call(this);CategoriesGridComponent.prototype.__init2.call(this); }
   __init() {this.router = inject(Router)}

  Input() __init2() {this.categories = []}

  goToCategory(category) {
    this.router.navigate(['/products'], { queryParams: { category: category.id } });
  }
}
