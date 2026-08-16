 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { UiTableComponent } from './table.component';
import { of } from 'rxjs';

describe('UiTableComponent', () => {
  let component;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiTableComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

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
    const compiled = fixture.nativeElement ;
    const ths = compiled.querySelectorAll('th');
    expect(ths.length).toBe(2);
    expect(_optionalChain([ths, 'access', _ => _[0], 'access', _2 => _2.textContent, 'optionalAccess', _3 => _3.trim, 'call', _4 => _4()])).toBe('id');
    expect(_optionalChain([ths, 'access', _5 => _5[1], 'access', _6 => _6.textContent, 'optionalAccess', _7 => _7.trim, 'call', _8 => _8()])).toBe('name');
  });

  it('should render rows', () => {
    component.columns = ['id', 'name'];
    component.rows = [{ id: of(1), name: of('Item 1') }, { id: of(2), name: of('Item 2') }];
    fixture.detectChanges();
    const compiled = fixture.nativeElement ;
    const trs = compiled.querySelectorAll('tbody tr');
    expect(trs.length).toBe(2);
    const tds1 = trs[0].querySelectorAll('td');
    expect(_optionalChain([tds1, 'access', _9 => _9[0], 'access', _10 => _10.textContent, 'optionalAccess', _11 => _11.trim, 'call', _12 => _12()])).toBe('1');
    expect(_optionalChain([tds1, 'access', _13 => _13[1], 'access', _14 => _14.textContent, 'optionalAccess', _15 => _15.trim, 'call', _16 => _16()])).toBe('Item 1');
  });
});
