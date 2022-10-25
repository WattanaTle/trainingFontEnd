import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { MenuService } from 'src/app/service/app.menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  menuSidebar: any[] = [];

  constructor(public appMain: LayoutComponent, public menuService: MenuService) {}

  ngOnInit() {
   this.menuSidebar = this.menuService.menuList();
  //  console.log(this.menuService.menuList());
  }

  onKeydown(event: KeyboardEvent) {
    const nodeElement = <HTMLDivElement>event.target;
    if (event.code === 'Enter' || event.code === 'Space') {
      nodeElement.click();
      event.preventDefault();
    }
  }
}
