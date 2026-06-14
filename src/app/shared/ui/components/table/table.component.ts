import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-table',
  template: `
    <div class="overflow-x-auto">
      <table class="w-full text-sm border-collapse">
        <thead class="border-b-2 border-border bg-muted">
          <tr>
            <th 
              *ngFor="let column of columns"
              class="text-left p-3 font-bold text-accent">
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            *ngFor="let row of rows"
            class="border-b border-border hover:bg-muted transition-colors">
            <td 
              *ngFor="let column of columns"
              class="p-3">
              <ng-container *ngIf="row[column] | async as data">
                {{ data }}
              </ng-container>
              <ng-container *ngIf="!(row[column] | async)">
                {{ row[column] }}
              </ng-container>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: []
})
export class UiTableComponent {
  @Input() columns: string[] = [];
  @Input() rows: any[] = [];
}
