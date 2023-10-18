import { Component, OnInit } from '@angular/core';
import { ETheme } from '../../enums/ETheme.enum';
import { Observable, delay, fromEvent } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public icon: string = ETheme.ICON_MOON;
  public textTheme: string = ETheme.TEXT_MOON;
  public theme: boolean | void = false;
  public activeTheme$!: Observable<Event>;

  constructor() {}

  ngOnInit() {
    this.init();
    try {
      this.theme = JSON.parse(localStorage.getItem('isDarkTheme') || '[]')
    }
    catch (e) {
      this.theme
    }
    if (this.theme === true) {
      this.addTheme();
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

  public addTheme() {
    this.theme = document.body.classList.add('dark-theme');
    this.textTheme = ETheme.TEXT_SUN;
    return (this.icon = ETheme.ICON_SUN);

  }

  public removeTheme() {
    this.theme = document.body.classList.remove('dark-theme');
    this.textTheme = ETheme.TEXT_MOON;
    return (this.icon = ETheme.ICON_MOON);
  }

  init(){
    this.activeTheme$ = fromEvent(window, 'storage');
    this.activeTheme$.pipe(delay(50)).subscribe(
      () => {
        let action = localStorage.getItem('isDarkTheme');
        if(action === 'true'){
          this.addTheme();
        }
        else if (action === 'false') {
          this.removeTheme();
        }
        else if(action != 'true' && action != 'false' && action != null){
          this.removeTheme();
          localStorage.setItem('isDarkTheme', JSON.stringify(false));
        }
        else {
          this.removeTheme();
        }
      }
    );
  }
}
