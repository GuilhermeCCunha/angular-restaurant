import { Component, OnInit } from '@angular/core';
import { ETheme } from '../../enums/ETheme.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public icon: string = ETheme.ICON_MOON;
  public textTheme: string = ETheme.TEXT_MOON;
  public theme: boolean = false;
  constructor() {}

  ngOnInit() {
    try {
      this.theme = JSON.parse(localStorage.getItem('isDarkTheme') || '[]')
    }
    catch (e) {
      this.theme
    }
    if (this.theme === true) {
      this.theme = document.body.classList.toggle('dark-theme');
      this.textTheme = ETheme.TEXT_SUN;
      this.icon = this.icon = ETheme.ICON_SUN
    }
  }

  public toggle() {
    this.theme = document.body.classList.toggle('dark-theme');
    localStorage.setItem('isDarkTheme', JSON.stringify(this.theme));
    if (this.theme) {
      this.textTheme = ETheme.TEXT_SUN;
      return (this.icon = ETheme.ICON_SUN);
    }

    this.textTheme = ETheme.TEXT_MOON;
    return (this.icon = ETheme.ICON_MOON);
  }
}
