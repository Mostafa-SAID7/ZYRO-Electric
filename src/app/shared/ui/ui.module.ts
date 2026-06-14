import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UiButtonComponent } from './components/button/button.component';
import { UiCardComponent } from './components/card/card.component';
import { UiInputComponent } from './components/input/input.component';
import { UiBadgeComponent } from './components/badge/badge.component';
import { UiTableComponent } from './components/table/table.component';
import { UiToastComponent } from './components/toast/toast.component';
import { UiConfirmationComponent } from './components/confirmation/confirmation.component';
import { UiSkeletonComponent, UiSkeletonGroupComponent } from './components/skeleton/skeleton.component';
import { UiErrorComponent, UiErrorBoundaryComponent } from './components/error/error.component';
import { UiNotFoundComponent } from './components/not-found/not-found.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SortDropdownComponent } from './components/sort-dropdown/sort-dropdown.component';
import { UiDrawerComponent } from './components/drawer/drawer.component';

const UI_COMPONENTS = [
  UiButtonComponent,
  UiCardComponent,
  UiInputComponent,
  UiBadgeComponent,
  UiTableComponent,
  UiToastComponent,
  UiConfirmationComponent,
  UiSkeletonComponent,
  UiSkeletonGroupComponent,
  UiErrorComponent,
  UiErrorBoundaryComponent,
  UiNotFoundComponent,
  SearchBarComponent,
  FilterPanelComponent,
  PaginationComponent,
  SortDropdownComponent,
  UiDrawerComponent
];

@NgModule({
  declarations: [...UI_COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [...UI_COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class UiModule { }
