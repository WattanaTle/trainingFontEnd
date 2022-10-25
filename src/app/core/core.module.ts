import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { UploadDialogComponent } from './components/upload-dialog/upload-dialog.component';
import { NgPrimeModule } from '../app.ngprime.module';
import { CheckValidatorsFormComponent } from './components/check-validators-form/check-validators-form.component';
import { AttachmentDialogComponent } from './components/attachment-dialog/attachment-dialog.component';
import { AttachmentListDialogComponent } from './components/attachment-list-dialog/attachment-list-dialog.component';
import { ThaidatePipe } from './pipes/dateformat/thaidate.pipe';


@NgModule({
  declarations: [
    UploadDialogComponent,
    ThaidatePipe,
    CheckValidatorsFormComponent,
    AttachmentDialogComponent,
    AttachmentListDialogComponent,
    // NumeralPipe
  ],
  imports: [
    NgPrimeModule,
    CommonModule
  ],
  exports: [
    UploadDialogComponent,
    ThaidatePipe,
    CheckValidatorsFormComponent,
    NgPrimeModule,
    AttachmentDialogComponent,
    AttachmentListDialogComponent
  ],
  providers: []
})
export class CoreModule { }
