import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiInputComponent } from './input.component';
import { CommonModule } from '@angular/common';

describe('UiInputComponent', () => {
  let component: UiInputComponent;
  let fixture: ComponentFixture<UiInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiInputComponent],
      imports: [CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UiInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Default inputs', () => {
    it('should default type to "text"', () => {
      expect(component.type).toBe('text');
    });

    it('should default value to empty string', () => {
      expect(component.value).toBe('');
    });

    it('should default disabled to false', () => {
      expect(component.disabled).toBeFalse();
    });

    it('should default label to undefined', () => {
      expect(component.label).toBeUndefined();
    });

    it('should default error to undefined', () => {
      expect(component.error).toBeUndefined();
    });
  });

  describe('getInputClasses()', () => {
    it('should include form-input base class', () => {
      expect(component.getInputClasses()).toContain('form-input');
    });

    it('should include "error" class when error is set', () => {
      component.error = 'This field is required';
      expect(component.getInputClasses()).toContain('error');
    });

    it('should NOT include "error" class when no error', () => {
      component.error = undefined;
      expect(component.getInputClasses()).not.toContain('error');
    });
  });

  describe('onInput()', () => {
    it('should update value and emit valueChange', () => {
      let emitted: string = '';
      component.valueChange.subscribe((v: string) => emitted = v);
      component.onInput({ target: { value: 'Hello ZYRO' } } as any);
      expect(component.value).toBe('Hello ZYRO');
      expect(emitted).toBe('Hello ZYRO');
    });
  });

  describe('onChange()', () => {
    it('should emit valueChange with input value', () => {
      let emitted: string = '';
      component.valueChange.subscribe((v: string) => emitted = v);
      component.onChange({ target: { value: 'Changed' } } as any);
      expect(emitted).toBe('Changed');
    });
  });
});
