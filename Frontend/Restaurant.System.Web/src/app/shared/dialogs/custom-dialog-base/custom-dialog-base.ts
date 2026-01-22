import { CustomDialogConfig } from "./custom-dialog.config";
import { CustomDialogRef } from "./custom-dialog.ref";


export abstract class CustomDialogBase<T = unknown> {
  abstract close(result?: unknown): void;
}
