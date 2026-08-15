import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

interface ColumnMedia {
  col1: string[];
  col2: string[];
  col3: string[];
  col4: string[];
}

// Unsplash images with proper URLs
const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1550614000-4b95d4ed798a?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
];

@Component({
  selector: 'app-parallax-gallery',
  templateUrl: './parallax-gallery.component.html',
  styleUrls: ['./parallax-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class ParallaxGalleryComponent implements OnInit, OnDestroy {
  @ViewChild('container', { static: false })
  containerRef!: ElementRef<HTMLDivElement>;

  cdr!: ChangeDetectorRef;

  colMedia: ColumnMedia = {
    col1: [],
    col2: [],
    col3: [],
    col4: [],
  };

  isReady = false;
  loadedCount = 0;
  scrollProgress = 0;

  private destroy$ = new Subject<void>();
  private animationFrameId: number | null = null;

  // Transform values for 3D animations
  bannerWidth = '90vw';
  bannerHeight = '80vh';
  bannerRadius = '48px';
  bannerBorderWidth = '4px';

  // 3D Matrix rotations
  rotateY = -45;
  rotateX = 25;
  rotateZ = 15;
  translateZ = -800;

  // Column parallax values
  yCol1 = '0%';
  yCol2 = '-40%';
  yCol3 = '0%';
  yCol4 = '-30%';

  constructor() {
    this.cdr = inject(ChangeDetectorRef);
    this.initializeColumnMedia();
  }

  ngOnInit(): void {
    // Set ready after a timeout
    setTimeout(() => {
      this.isReady = true;
      this.cdr.markForCheck();
    }, 1200);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.updateScrollAnimation();
  }

  private initializeColumnMedia(): void {
    const col1Base = UNSPLASH_IMAGES.filter((_, i) => i % 4 === 0);
    const col2Base = UNSPLASH_IMAGES.filter((_, i) => i % 4 === 1);
    const col3Base = UNSPLASH_IMAGES.filter((_, i) => i % 4 === 2);
    const col4Base = UNSPLASH_IMAGES.filter((_, i) => i % 4 === 3);

    this.colMedia = {
      col1: [...col1Base, ...col1Base],
      col2: [...col2Base, ...col2Base],
      col3: [...col3Base, ...col3Base],
      col4: [...col4Base, ...col4Base],
    };
  }

  private updateScrollAnimation(): void {
    if (!this.containerRef) return;

    const containerElement = this.containerRef.nativeElement;
    const containerHeight = containerElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    // Calculate scroll progress relative to container position
    const scrollPosition = window.scrollY;
    const containerScrollTop = containerElement.offsetTop;
    const relativeScroll = scrollPosition - containerScrollTop;
    
    // Calculate scroll progress (0 to 1)
    const totalScrollableHeight = containerHeight - viewportHeight;
    this.scrollProgress = Math.min(1, Math.max(0, relativeScroll / totalScrollableHeight));

    // Update banner animations (0 to 0.15)
    if (this.scrollProgress <= 0.15) {
      const progress = this.scrollProgress / 0.15;
      this.bannerWidth = this.interpolate(90, 100, progress) + 'vw';
      this.bannerHeight = this.interpolate(80, 100, progress) + 'vh';
      this.bannerRadius = this.interpolate(48, 0, progress) + 'px';
      this.bannerBorderWidth = this.interpolate(4, 0, progress) + 'px';
    } else {
      this.bannerWidth = '100vw';
      this.bannerHeight = '100vh';
      this.bannerRadius = '0px';
      this.bannerBorderWidth = '0px';
    }

    // Update 3D rotations (0.15 to 1)
    if (this.scrollProgress >= 0.15) {
      const progress = (this.scrollProgress - 0.15) / (1 - 0.15);
      this.rotateY = this.interpolate(-45, -8, progress);
      this.rotateX = this.interpolate(25, 4, progress);
      this.rotateZ = this.interpolate(15, 2, progress);
      this.translateZ = this.interpolate(-800, 0, progress);

      // Column parallax
      this.yCol1 = this.interpolatePercent(0, -40, progress) + '%';
      this.yCol2 = this.interpolatePercent(-40, 10, progress) + '%';
      this.yCol3 = this.interpolatePercent(0, -40, progress) + '%';
      this.yCol4 = this.interpolatePercent(-30, 20, progress) + '%';
    }

    this.cdr.markForCheck();
  }

  private interpolate(start: number, end: number, progress: number): number {
    return start + (end - start) * progress;
  }

  private interpolatePercent(start: number, end: number, progress: number): number {
    return start + (end - start) * progress;
  }

  onImageLoad(): void {
    this.loadedCount++;
    if (!this.isReady && this.loadedCount >= 1) {
      this.isReady = true;
      this.cdr.markForCheck();
    }
  }

  getTransformStyle(column: number): string {
    let yValue = this.yCol1;
    if (column === 2) yValue = this.yCol2;
    if (column === 3) yValue = this.yCol3;
    if (column === 4) yValue = this.yCol4;

    return `translateY(${yValue})`;
  }

  get3DTransformStyle(): string {
    return `rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg) rotateZ(${this.rotateZ}deg) translateZ(${this.translateZ}px)`;
  }
}
