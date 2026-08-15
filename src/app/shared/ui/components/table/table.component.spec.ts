import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTableComponent } from './table.component';

describe('UiTableComponent', () => {
  let component: UiTableComponent;
  let fixture: ComponentFixture<UiTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render columns', () => {
    component.columns = ['id', 'name'];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const ths = compiled.querySelectorAll('th');
    expect(ths.length).toBe(2);
    expect(ths[0].textContent?.trim()).toBe('id');
    expect(ths[1].textContent?.trim()).toBe('name');
  });

  it('should render rows', () => {
    component.columns = ['id', 'name'];
    component.rows = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const trs = compiled.querySelectorAll('tbody tr');
    expect(trs.length).toBe(2);
    const tds1 = trs[0].querySelectorAll('td');
    expect(tds1[0].textContent?.trim()).toBe('1');
    expect(tds1[1].textContent?.trim()).toBe('Item 1');
  });
});
