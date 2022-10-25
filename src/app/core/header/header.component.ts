import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(public appLayout: LayoutComponent) {}

  ngOnInit() {}
}
