
export abstract class CustomDialogBase {
  abstract open(): void;
  abstract close(): void;
  abstract visible(): void;

  onOpenDialog?: () => void;
  onButtonClick?: () => void;
}
