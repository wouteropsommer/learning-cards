import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-map-dialog',
  templateUrl: './new-map-dialog.component.html',
  styleUrls: ['./new-map-dialog.component.css']
})
export class NewMapDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewMapDialogComponent>){}
  
  name: string;

  ngOnInit() {
  }

}
