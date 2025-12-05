import { FormGroup, AbstractControl, ValidatorFn, AbstractControlOptions, AsyncValidatorFn, FormControl } from "@angular/forms";
import { RSLabelFormControlBase } from "../base/custom-label-form-control-base/custom-label-form-control-base";
// import { Dictionary } from '../../../../utils/dictionary';
// import { CustomFormControl } from '../base/form-control/custom-form-control';
// import { CustomFormArrayBase, CustomFormElementType } from './../base/form-control/form-array-base';

export class CustomFormGroup extends FormGroup {
  constructor(
    controls: Record<string, AbstractControl> = {},
    validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[],
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }

  private addCustomControl(name: string, control: AbstractControl, disabled = false): void{
    if(disabled) control.disable();
    super.addControl(name, control);
  }

  public addCustomFormControl(name: string, control: RSLabelFormControlBase, disabled = false): void {
    if(control) control.inputId = name;
    this.addCustomControl(name, control, disabled);
  }

}
