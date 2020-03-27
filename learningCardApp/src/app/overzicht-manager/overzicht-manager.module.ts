import { NgModule } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { FormsModule } from '@angular/forms'
import { OverzichtManagerComponent } from './overzicht-manager.component';
import { NewMapDialogComponent } from './modals/new-map-dialog/new-map-dialog.component';
import { RenameMapDialogComponent } from './modals/rename-map-dialog/rename-map-dialog.component';
import { FileService } from '../service/file.service';


@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatGridListModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatListModule
    
  ], 
  declarations: [OverzichtManagerComponent, NewMapDialogComponent, RenameMapDialogComponent], 
  exports: [OverzichtManagerComponent],
  entryComponents: [NewMapDialogComponent, RenameMapDialogComponent], 
  providers: [FileService]
})
export class OverzichtManagerModule { }
