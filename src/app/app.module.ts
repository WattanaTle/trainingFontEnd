import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MenuService } from './service/app.menu.service';
import { ConfigService } from './service/app.config.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { LayoutComponent } from './core/layout/layout.component';
import { MunuitemComponent } from './core/menu/menu.component';
import { NgPrimeModule } from './app.ngprime.module';

@NgModule({
  declarations: [AppComponent, SidebarComponent, LayoutComponent, HeaderComponent, MunuitemComponent],
  imports: [NgPrimeModule, HttpClientModule, BrowserModule, FormsModule, BrowserAnimationsModule, AppRoutingModule],
  providers: [MenuService, ConfigService],
  bootstrap: [AppComponent],
})
export class AppModule {}
