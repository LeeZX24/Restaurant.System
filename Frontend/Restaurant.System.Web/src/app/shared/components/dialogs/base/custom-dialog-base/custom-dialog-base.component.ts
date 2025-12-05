import { CommonModule, NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, input, OnInit, signal, TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'rs-dialog-base',
  templateUrl: './custom-dialog-base.component.html',
  styleUrls: ['./custom-dialog-base.component.css'],
  imports: [CommonModule, NgClass, NgTemplateOutlet]
})
export class CustomDialogBaseComponent {
  isVisible = signal(true);

  // Input
  themeCssClass = input<string>();
  headerTemplate = input<TemplateRef<void>>();
  footerTemplate = input<TemplateRef<void> | null>(null);

  onOpenDialog?: () => void;
  onButtonClick?:() => void;

  close() {
    this.isVisible.set(false);
  }

  open() {
    this.isVisible.set(true);
    this.onOpenDialog?.();
  }

  visible() {
    return this.isVisible();
  }
}
