import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private renderer: Renderer2;
  private theme$ = new BehaviorSubject<Theme>('light');

  readonly currentTheme$ = this.theme$.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initTheme();
  }

  private initTheme() {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const theme = savedTheme || 'light';
    this.setTheme(theme);
  }

  setTheme(theme: Theme) {
    this.theme$.next(theme);
    localStorage.setItem('theme', theme);
    this.renderer.setAttribute(document.body, 'Theme', theme);
  }

  toggleTheme() {
    const nextTheme = this.theme$.value === 'light' ? 'dark' : 'light';
    this.setTheme(nextTheme);
  }

  get currentTheme(): Theme {
    return this.theme$.value;
  }
}
