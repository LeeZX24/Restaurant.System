import { Component, viewChild } from '@angular/core';
import { CustomDialogBaseComponent } from '../../base/custom-dialog-base/custom-dialog-base.component';
import { CustomDialogBase } from '../../base/custom-dialog-base/custom-dialog-base';

@Component({
  selector: 'rs-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
  imports: [CustomDialogBaseComponent]
})
export class ConfirmationDialogComponent implements CustomDialogBase {
  dialog = viewChild<CustomDialogBaseComponent>('dialogBase');

  onOpenDialog?: () => void;

  open() {
    const dlg = this.dialog();
    if(dlg) {
      dlg.onOpenDialog = () => {
        this.onOpenDialog?.();
      }
      dlg.open();
    }
  }

  close() { this.dialog()?.close(); }

  visible() { return !!this.dialog()?.isVisible(); }
}
