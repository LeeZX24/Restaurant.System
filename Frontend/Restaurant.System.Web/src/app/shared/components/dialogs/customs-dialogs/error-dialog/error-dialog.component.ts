import { Component, OnInit, viewChild } from '@angular/core';
import { CustomDialogBaseComponent } from "../../base/custom-dialog-base/custom-dialog-base.component";

@Component({
  selector: 'rs-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css'],
  imports: [CustomDialogBaseComponent]
})
export class ErrorDialogComponent {
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
