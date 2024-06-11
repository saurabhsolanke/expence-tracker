import { ApplicationRef, ChangeDetectorRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NightModeService {
  private renderer: Renderer2;
  private readonly NIGHT_MODE_KEY = 'nightModeState';
  isNightMode: boolean;

  constructor(
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.isNightMode = localStorage.getItem(this.NIGHT_MODE_KEY) === 'true';
    this.applyNightMode(this.isNightMode);
  }

  toggleNightMode() {
    this.isNightMode = !this.isNightMode;
    localStorage.setItem(this.NIGHT_MODE_KEY, this.isNightMode.toString());
    this.applyNightMode(this.isNightMode);
  }

  private applyNightMode(isNightMode: boolean) {
    if (isNightMode) {
      this.renderer.addClass(document.body, 'night-mode');
    } else {
      this.renderer.removeClass(document.body, 'night-mode');
    }
  }
}
