import { FormArray, ValidatorFn } from "@angular/forms";
import { CustomFormGroup } from "../../form-groups/form-group";
import { CustomFormControl } from "./custom-form-control";

export type CustomFormElementType = CustomFormGroup | CustomFormControl | CustomFormArrayBase;

export abstract class CustomFormArrayBase extends FormArray {
  constructor(controls?: CustomFormElementType[], validator?: ValidatorFn[] | null) {
    super([]);
    controls?.forEach(x => {
      this.push(x);
    });

    this.setValidators(validator ?? null);
  }

  get customControls(): CustomFormElementType[] {
    return this.controls.map(x => x as CustomFormElementType);
  }

  public override push(control: CustomFormElementType){
    super.push(control);
  }

  override get invalid(): boolean {
    return this.customControls.some(x => x.invalid);
  }
}
