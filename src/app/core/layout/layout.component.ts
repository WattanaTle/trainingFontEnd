import { Component, AfterViewInit, OnDestroy, Renderer2, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppComponent } from 'src/app/app.component';
import { ConfigService } from 'src/app/service/app.config.service';
import { AppConfig } from 'src/app/models/appconfig';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  animations: [
    trigger('submenu', [
      state(
        'hidden',
        style({
          height: '0px',
        })
      ),
      state(
        'visible',
        style({
          height: '*',
        })
      ),
      transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
    ]),
  ],
})
export class LayoutComponent implements AfterViewInit, OnDestroy, OnInit {
  public menuInactiveDesktop: boolean = false;

  public menuActiveMobile: boolean = false;

  public overlayMenuActive: boolean = false;

  public staticMenuInactive: boolean = false;

  public profileActive: boolean = false;

  public topMenuActive: boolean = false;

  public topMenuLeaving: boolean = false;

  public theme: string = '';

  documentClickListener: (() => void) | undefined;

  menuClick: boolean = false;

  topMenuButtonClick: boolean = false;

  configActive: boolean = false;

  configClick: boolean = false;

  config!: AppConfig;

  subscription: Subscription | undefined;

  constructor(public renderer: Renderer2, public app: AppComponent, public configService: ConfigService) {}

  ngOnInit() {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe((config) => (this.config = config));
  }

  ngAfterViewInit() {
    // hides the overlay menu and top menu if outside is clicked
    this.documentClickListener = this.renderer.listen('body', 'click', (event) => {
      if (!this.isDesktop()) {
        if (!this.menuClick) {
          this.menuActiveMobile = false;
        }

        if (!this.topMenuButtonClick) {
          this.hideTopMenu();
        }
      } else {
        if (!this.menuClick && this.isOverlay()) {
          this.menuInactiveDesktop = true;
        }
        if (!this.menuClick) {
          this.overlayMenuActive = false;
        }
      }

      if (this.configActive && !this.configClick) {
        this.configActive = false;
      }

      this.configClick = false;
      this.menuClick = false;
      this.topMenuButtonClick = false;
    });
  }

  toggleMenu(event: Event) {
    this.menuClick = true;

    if (this.isDesktop()) {
      if (this.app.menuMode === 'overlay') {
        if (this.menuActiveMobile === true) {
          this.overlayMenuActive = true;
        }

        this.overlayMenuActive = !this.overlayMenuActive;
        this.menuActiveMobile = false;
      } else if (this.app.menuMode === 'static') {
        this.staticMenuInactive = !this.staticMenuInactive;
      }
    } else {
      this.menuActiveMobile = !this.menuActiveMobile;
      this.topMenuActive = false;
    }

    event.preventDefault();
  }

  toggleProfile(event: Event) {
    this.profileActive = !this.profileActive;
    event.preventDefault();
  }

  toggleTopMenu(event: Event) {
    this.topMenuButtonClick = true;
    this.menuActiveMobile = false;

    if (this.topMenuActive) {
      this.hideTopMenu();
    } else {
      this.topMenuActive = true;
    }

    event.preventDefault();
  }

  hideTopMenu() {
    this.topMenuLeaving = true;
    setTimeout(() => {
      this.topMenuActive = false;
      this.topMenuLeaving = false;
    }, 1);
  }

  onMenuClick() {
    this.menuClick = true;
  }

  onConfigClick(event: Event) {
    this.configClick = true;
  }

  isStatic() {
    return this.app.menuMode === 'static';
  }

  isOverlay() {
    return this.app.menuMode === 'overlay';
  }

  isDesktop() {
    return window.innerWidth > 992;
  }

  isMobile() {
    return window.innerWidth < 1024;
  }

  onSearchClick() {
    this.topMenuButtonClick = true;
  }

  ngOnDestroy() {
    if (this.documentClickListener) {
      this.documentClickListener();
    }

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
