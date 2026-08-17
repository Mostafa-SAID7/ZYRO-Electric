
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { BranchesComponent } from './branches.component';

const routes = [
  {
    path: '',
    component: BranchesComponent
  }
];

@NgModule({
  declarations: [
    BranchesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    LucideAngularModule
  ]
})
export class BranchesModule { }
