import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<AddEditCategoryComponent>,@Inject(MAT_DIALOG_DATA) public data: MatDialog) { }

  ngOnInit() {
  }

}
