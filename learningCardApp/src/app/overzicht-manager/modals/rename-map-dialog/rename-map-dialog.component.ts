import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rename-map-dialog',
  templateUrl: './rename-map-dialog.component.html',
  styleUrls: ['./rename-map-dialog.component.css']
})
export class RenameMapDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RenameMapDialogComponent>) {}
  
  name: string;

  

  ngOnInit() {
  }

}
