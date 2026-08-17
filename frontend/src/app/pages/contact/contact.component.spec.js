 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact.component';
import { CONTACT_METHODS } from './data';

describe('ContactComponent', () => {
  let component;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [ReactiveFormsModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load contact methods from data.ts', () => {
    expect(component.contactMethods).toEqual(CONTACT_METHODS);
    expect(component.contactMethods.length).toBe(4);
  });

  it('should have submitted initially false', () => {
    expect(component.submitted).toBeFalsy();
  });

  it('should initialize contact form with all fields', () => {
    expect(component.contactForm.get('name')).toBeDefined();
    expect(component.contactForm.get('email')).toBeDefined();
    expect(component.contactForm.get('subject')).toBeDefined();
    expect(component.contactForm.get('message')).toBeDefined();
    expect(component.contactForm.get('category')).toBeDefined();
  });

  it('should have contact methods with required properties', () => {
    component.contactMethods.forEach(method => {
      expect(method.title).toBeDefined();
      expect(method.icon).toBeDefined();
      expect(method.primary).toBeDefined();
      expect(method.secondary).toBeDefined();
    });
  });

  it('should have contact methods: Email, Phone, Live Chat, Social Media', () => {
    const titles = component.contactMethods.map(m => m.title);
    expect(titles).toContain('Email');
    expect(titles).toContain('Phone');
    expect(titles).toContain('Live Chat');
    expect(titles).toContain('Social Media');
  });

  it('should validate form - name required', () => {
    const nameControl = component.contactForm.get('name');
    _optionalChain([nameControl, 'optionalAccess', _ => _.setValue, 'call', _2 => _2('')]);
    expect(_optionalChain([nameControl, 'optionalAccess', _3 => _3.hasError, 'call', _4 => _4('required')])).toBeTruthy();
  });

  it('should validate form - email required and valid format', () => {
    const emailControl = component.contactForm.get('email');
    _optionalChain([emailControl, 'optionalAccess', _5 => _5.setValue, 'call', _6 => _6('')]);
    expect(_optionalChain([emailControl, 'optionalAccess', _7 => _7.hasError, 'call', _8 => _8('required')])).toBeTruthy();
    _optionalChain([emailControl, 'optionalAccess', _9 => _9.setValue, 'call', _10 => _10('invalid-email')]);
    expect(_optionalChain([emailControl, 'optionalAccess', _11 => _11.hasError, 'call', _12 => _12('email')])).toBeTruthy();
  });

  it('should validate form - subject required and min length 5', () => {
    const subjectControl = component.contactForm.get('subject');
    _optionalChain([subjectControl, 'optionalAccess', _13 => _13.setValue, 'call', _14 => _14('test')]);
    expect(_optionalChain([subjectControl, 'optionalAccess', _15 => _15.hasError, 'call', _16 => _16('minlength')])).toBeTruthy();
  });

  it('should validate form - message required and min length 10', () => {
    const messageControl = component.contactForm.get('message');
    _optionalChain([messageControl, 'optionalAccess', _17 => _17.setValue, 'call', _18 => _18('short')]);
    expect(_optionalChain([messageControl, 'optionalAccess', _19 => _19.hasError, 'call', _20 => _20('minlength')])).toBeTruthy();
  });

  it('should set submitted true on submit attempt', () => {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  });

  it('should reject invalid form on submit', () => {
    component.contactForm.reset();
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
    expect(component.contactForm.valid).toBeFalsy();
  });

  it('should accept valid form on submit', () => {
    component.contactForm.patchValue({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message for the contact form',
      category: 'general'
    });
    expect(component.contactForm.valid).toBeTruthy();
  });
});
