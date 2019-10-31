import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ViewOrderComponent>,@Inject(MAT_DIALOG_DATA) public data: MatDialog) { }

  ngOnInit() {
    
  }
}
