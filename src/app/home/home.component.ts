import { Component, ElementRef, Renderer2, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private animationToken: number | undefined;
  private animationTimeouts: number[] = [];
 
  constructor(private renderer: Renderer2, private elementRef: ElementRef, @Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: Object) {}
 
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.applyHoverEffects();
      window.addEventListener('scroll', () => {
        this.cancelPendingAnimations();
        this.clearHoverStyles();
        this.applyHoverEffects();
      });
    }
  }
 
  private applyHoverEffects(): void {
    const stepsRight = Array.from(this.elementRef.nativeElement.querySelectorAll('.step-right')) as HTMLElement[];
    const stepsLeft = Array.from(this.elementRef.nativeElement.querySelectorAll('.step-left')) as HTMLElement[];
 
    const hoverColors: { [key: string]: string } = {
      'discovery': 'rgb(245, 95, 95)',  
      'strategy': 'rgb(111, 111, 241)',    
      'development': 'rgb(145, 190, 124)',
      'testing': 'rgb(245, 195, 102)',  
      'launch': 'rgb(248, 90, 116)',  
      'support': 'rgb(89, 141, 151)'    
    };
 
    const applyHoverStyles = (element: HTMLElement, bgColor: string) => {
      this.renderer.setStyle(element, 'background-color', bgColor);
      this.renderer.setStyle(element, 'color', 'white');
     
      const content = element.querySelector('.content') as HTMLElement;
      const icon = element.querySelector('.icon') as HTMLElement;
 
      if (element.classList.contains('step-left') && content && icon) {
        this.renderer.setStyle(content, 'transform', 'translateX(-30px)');
        this.renderer.setStyle(icon, 'order', '1');
      } else if (element.classList.contains('step-right') && content && icon) {
        this.renderer.setStyle(content, 'transform', 'translateX(30px)');
        this.renderer.setStyle(icon, 'order', '-1');
      }
    };
 
    const removeHoverStyles = (element: HTMLElement) => {
      this.renderer.removeStyle(element, 'background-color');
      this.renderer.removeStyle(element, 'color');
 
      const content = element.querySelector('.content') as HTMLElement;
      const icon = element.querySelector('.icon') as HTMLElement;
 
      if (content && icon) {
        this.renderer.removeStyle(content, 'transform');
        this.renderer.removeStyle(icon, 'order');
      }
    };
 
    const simulateHover = (element: HTMLElement, delay: number, bgColor: string, token: number) => {
      const timeoutId = window.setTimeout(() => {
        if (this.animationToken !== token) return;
        applyHoverStyles(element, bgColor);
        const removeTimeoutId = window.setTimeout(() => {
          if (this.animationToken !== token) return;
          removeHoverStyles(element);
        }, 1000);
        this.animationTimeouts.push(removeTimeoutId);
      }, delay);
      this.animationTimeouts.push(timeoutId);
    };
 
    const token = Date.now();
    this.animationToken = token;
    let delay = 0;
 
    for (let i = 0; i < Math.max(stepsRight.length, stepsLeft.length); i++) {
      if (stepsRight[i] && this.elementPartiallyInViewport(stepsRight[i])) {
        const className = this.getStepClassName(stepsRight[i]);
        simulateHover(stepsRight[i], delay, hoverColors[className], token);
        delay += 1000;
      }
 
      if (stepsLeft[i] && this.elementPartiallyInViewport(stepsLeft[i])) {
        const className = this.getStepClassName(stepsLeft[i]);
        simulateHover(stepsLeft[i], delay, hoverColors[className], token);
        delay += 1000;
      }
    }
  }
 
  private getStepClassName(step: HTMLElement): string {
    if (step.classList.contains('discovery')) {
      return 'discovery';
    } else if (step.classList.contains('strategy')) {
      return 'strategy';
    } else if (step.classList.contains('development')) {
      return 'development';
    } else if (step.classList.contains('testing')) {
      return 'testing';
    } else if (step.classList.contains('launch')) {
      return 'launch';
    } else if (step.classList.contains('support')) {
      return 'support';
    }
    return '';
  }
 
  private elementPartiallyInViewport(el: HTMLElement): boolean {
    if (!el || typeof el.getBoundingClientRect !== 'function') {
      return false;
    }
 
    let rect = el.getBoundingClientRect();
 
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0
    );
  }
 
  private clearHoverStyles(): void {
    const stepsRight = Array.from(this.elementRef.nativeElement.querySelectorAll('.step-right')) as HTMLElement[];
    const stepsLeft = Array.from(this.elementRef.nativeElement.querySelectorAll('.step-left')) as HTMLElement[];
 
    stepsRight.forEach(step => {
      this.renderer.removeStyle(step, 'background-color');
      this.renderer.removeStyle(step, 'color');
      const content = step.querySelector('.content') as HTMLElement;
      const icon = step.querySelector('.icon') as HTMLElement;
 
      if (content && icon) {
        this.renderer.removeStyle(content, 'transform');
        this.renderer.removeStyle(icon, 'order');
      }
    });
 
    stepsLeft.forEach(step => {
      this.renderer.removeStyle(step, 'background-color');
      this.renderer.removeStyle(step, 'color');
      const content = step.querySelector('.content') as HTMLElement;
      const icon = step.querySelector('.icon') as HTMLElement;
 
      if (content && icon) {
        this.renderer.removeStyle(content, 'transform');
        this.renderer.removeStyle(icon, 'order');
      }
    });
  }
 
  private cancelPendingAnimations(): void {
    this.animationToken = undefined;
    this.animationTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    this.animationTimeouts = [];
  }
}