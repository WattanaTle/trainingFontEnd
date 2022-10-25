import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MENU_ITR } from 'src/environments/environment.module';

@Injectable()
export class MenuService {
  private menuSource = new Subject<string>();
  private resetSource = new Subject();

  menuSource$ = this.menuSource.asObservable();
  resetSource$ = this.resetSource.asObservable();

  onMenuStateChange(key: string) {
    this.menuSource.next(key);
  }

  reset() {
    this.resetSource.next(true);
  }

  menuList() {
    switch (environment.moduleId) {
      case 'itr':
         return MENU_ITR;
      default:
        return [].concat(...[MENU_ITR]);
    }
  }
}
