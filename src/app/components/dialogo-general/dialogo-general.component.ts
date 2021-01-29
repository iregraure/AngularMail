import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataType, DialogTypes } from './dialog-data-type';

@Component({
  selector: 'app-dialogo-general',
  templateUrl: './dialogo-general.component.html',
  styleUrls: ['./dialogo-general.component.css']
})
export class DialogoGeneralComponent {

  public dialogTypeClass = DialogTypes;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataType) { }

}
