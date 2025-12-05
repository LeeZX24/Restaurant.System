import { Component, input, OnInit, viewChild } from '@angular/core';
import { CustomDialogBaseComponent } from "../../base/custom-dialog-base/custom-dialog-base.component";
import { CustomDialogBase } from '../../base/custom-dialog-base/custom-dialog-base';
import { _ } from '@ngx-translate/core';

@Component({
  selector: 'rs-information-dialog',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.css'],
  imports: [CustomDialogBaseComponent]
})
export class InformationDialogComponent implements CustomDialogBase {

  dialog = viewChild<CustomDialogBaseComponent>('dialogBase');

  hasFooter = input<boolean>(false);
  onOpenDialog?: () => void;
  
  onOkButtonClick? : () => void;

  open() {
    const dlg = this.dialog();
    if(dlg) {
      dlg.onOpenDialog = () => {
        this.onOpenDialog?.();
      };
      dlg.onButtonClick = () => {
        this.onOkButtonClick?.();
      };
      dlg.open();
    }
  }

  close() { this.dialog()?.close(); }

  visible() { return !!this.dialog()?.isVisible(); }
}
