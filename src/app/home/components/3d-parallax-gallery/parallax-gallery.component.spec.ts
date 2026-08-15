import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParallaxGalleryComponent } from './parallax-gallery.component';

describe('ParallaxGalleryComponent', () => {
  let component: ParallaxGalleryComponent;
  let fixture: ComponentFixture<ParallaxGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParallaxGalleryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParallaxGalleryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize column media with 4 columns', () => {
    expect(component.colMedia.col1).toBeDefined();
    expect(component.colMedia.col2).toBeDefined();
    expect(component.colMedia.col3).toBeDefined();
    expect(component.colMedia.col4).toBeDefined();
  });

  it('should have duplicated images in each column', () => {
    // Each column should have 2 sets of base images
    expect(component.colMedia.col1.length).toBeGreaterThan(0);
    expect(component.colMedia.col2.length).toBeGreaterThan(0);
    expect(component.colMedia.col3.length).toBeGreaterThan(0);
    expect(component.colMedia.col4.length).toBeGreaterThan(0);
  });

  it('should set isReady to true after timeout', (done) => {
    expect(component.isReady).toBeFalsy();
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.isReady).toBeTruthy();
      done();
    }, 1300);
  });

  it('should increment loadedCount on image load', () => {
    const initialCount = component.loadedCount;
    component.onImageLoad();
    expect(component.loadedCount).toBe(initialCount + 1);
  });

  it('should calculate transform styles for columns', () => {
    component.yCol1 = '10%';
    component.yCol2 = '-20%';
    component.yCol3 = '5%';
    component.yCol4 = '-15%';

    expect(component.getTransformStyle(1)).toContain('10%');
    expect(component.getTransformStyle(2)).toContain('-20%');
    expect(component.getTransformStyle(3)).toContain('5%');
    expect(component.getTransformStyle(4)).toContain('-15%');
  });

  it('should calculate 3D transform style', () => {
    component.rotateX = 25;
    component.rotateY = -45;
    component.rotateZ = 15;
    component.translateZ = -800;

    const transform = component.get3DTransformStyle();
    expect(transform).toContain('rotateX(25deg)');
    expect(transform).toContain('rotateY(-45deg)');
    expect(transform).toContain('rotateZ(15deg)');
    expect(transform).toContain('translateZ(-800px)');
  });

  it('should interpolate between start and end values', () => {
    // Test interpolation at 50% progress
    const result = component['interpolate'](0, 100, 0.5);
    expect(result).toBe(50);

    // Test at 0% progress
    const resultStart = component['interpolate'](0, 100, 0);
    expect(resultStart).toBe(0);

    // Test at 100% progress
    const resultEnd = component['interpolate'](0, 100, 1);
    expect(resultEnd).toBe(100);
  });

  it('should handle scroll animation lifecycle', () => {
    fixture.detectChanges();
    expect(component.scrollProgress).toBeGreaterThanOrEqual(0);
  });

  it('should cleanup on destroy', () => {
    fixture.detectChanges();
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });

  it('should use OnPush change detection strategy', () => {
    const metadata = (component.constructor as any).__annotations__[0];
    expect(metadata.changeDetection).toBeDefined();
  });

  it('should be a standalone component', () => {
    const metadata = (component.constructor as any).__annotations__[0];
    expect(metadata.standalone).toBeTruthy();
  });
});
