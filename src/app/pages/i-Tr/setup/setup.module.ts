import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPrimeModule } from 'src/app/app.ngprime.module';
import { SetupRoutingModule } from './setup-routing.module';
import { SetupComponent } from './setup.component';
import { R0001Component } from './r0001/r0001.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { R0001Service } from './r0001/r0001.service';
// import { UploadDialogR0001Component } from './r0001/upload-dialog-r0001/upload-dialog-r0001.component';
// import { UploadDialogComponent } from './../setup/upload-dialog/upload-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { R0003Component } from './r0003/r0003.component';
import { R0003Service } from './r0003/r0003.service';
import { R0002Component } from './r0002/r0002.component';
import { R0002Service } from './r0002/r0002.service';
import { PaginatorModule } from "primeng/paginator";
import { FileUploadModule } from "primeng/fileupload";
import { CoreModule } from 'src/app/core/core.module';
import { UploadDialogR0001Component } from './r0001/upload-dialog-r0001/upload-dialog-r0001.component';
import { UploadDialogR0002Component } from './r0002/upload-dialog-r0002/upload-dialog-r0002.component';
import { UploadComponent } from './r0003/upload/upload.component';

@NgModule({
  declarations: [SetupComponent, R0001Component, R0002Component, R0003Component, UploadDialogR0002Component, UploadDialogR0001Component, UploadComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SetupRoutingModule,
    NgPrimeModule,
    PaginatorModule,
    FileUploadModule,
    CoreModule
  ],

  providers: [DialogService, R0001Service, R0003Service, R0002Service],
})
export class SetupModule { }
