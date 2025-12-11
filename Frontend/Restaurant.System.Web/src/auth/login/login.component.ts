import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDto } from '../../app/shared/models/dtos/user.dto';
import { provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { CustomFormGroup, RSEmailFormControlComponent, RSPasswordFormControlComponent, RSTextFormControl } from '@rs/forms';
import { BaseAuthComponent } from '../../app/shared/components/base-auth-component/base-auth-component';

@Component({
  selector: 'rs-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RSEmailFormControlComponent,
    RSPasswordFormControlComponent
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class LoginComponent extends BaseAuthComponent<UserDto> {
  _request!: UserDto;
  get request(): UserDto { return this._request; }
  set request(value: UserDto) { this._request = value; }

  createForm(): CustomFormGroup {
    const fg = new CustomFormGroup();

    fg.addCustomFormControl('email', new RSTextFormControl({ required: true,}, ''));
    fg.addCustomFormControl('password', new RSTextFormControl({ required: true,}, ''));
    return fg;
  }

  get emailFC() { return this.getFormControl('email') as RSTextFormControl; }
  get passwordFC() { return this.getFormControl('password') as RSTextFormControl; }

  getFormControl(name: string) {
    return this.form.get(name);
  }

  getFormRequest(): UserDto {
    const req: UserDto =
    {
      ...this.form.getRawValue()
    };
    return req;
  }

  onValidateForm(): boolean {

    console.log('validation');
    return false;
  }
}
