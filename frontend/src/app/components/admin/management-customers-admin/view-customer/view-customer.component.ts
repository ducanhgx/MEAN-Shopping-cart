import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ViewCustomerComponent>,@Inject(MAT_DIALOG_DATA) public data: MatDialog) { }

  ngOnInit() {
    
  }
}
