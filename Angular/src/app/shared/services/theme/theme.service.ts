import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  private theme: string = 'light';

  setTheme(theme: string): void{
    this.theme = theme;
  }

  getTheme(): string{
    return this.theme;
  }

}
