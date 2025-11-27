import { Component, inject } from '@angular/core';
import { Validators, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../app/core/services/auth.service/auth.service';
import { UserDto } from '../../app/shared/models/dtos/user.dto';
import { CommonModule } from '@angular/common';
import { CustomLabelEmailFormControlComponent } from "../../app/shared/components/forms/form-controls/custom-label-email-form-control/custom-label-email-form-control.component";
import { CustomLabelTextFormControl } from '../../app/shared/components/forms/form-controls/custom-label-text-form-control/custom-label-text-form-control';
import { CustomFormGroup } from '../../app/shared/components/forms/form-groups/form-group';
import { SHARED_EXPORTS, SHARED_IMPORTS } from '../../app/shared/shared.module';
import { provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
    ...SHARED_EXPORTS,
    CustomLabelEmailFormControlComponent,
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class LoginComponent {
  private authServ = inject(AuthService);
  loginForm: FormGroup = this.createForm();


  createForm(): CustomFormGroup {
    let fg = new CustomFormGroup();

    fg.addControl('email', new CustomLabelTextFormControl('Email', { required: true,}, ''));
    fg.addControl('password', new FormControl('',{validators: [Validators.required], nonNullable: true},));
    return fg;
  }

  get emailFC() { return <CustomLabelTextFormControl>this.getFormControl('email'); }

  getFormControl(name: string) {
    return this.loginForm.get(name);
  }

  // form = this.fb.group({
  //   email: ['', [Validators.required, Validators.email]],
  //   passwordHash: ['', Validators.required]
  // });

  submit() {
    if (this.loginForm.invalid) return;
    const req: UserDto =
    {
      ...this.loginForm.getRawValue()
    };
    console.log('Login payload:', req);
    this.authServ.login(req).subscribe({
       next: (res) => this.handleLoginSuccess(res),
    error: (err) => this.handleLoginError(err)
    });
    // Example:
    // this.authService.login(this.form.value).subscribe(...)
  }

  private handleLoginSuccess(res: UserDto) {

    if(res != null) {

      if(res.token) {
        // 1. Save token (if backend returned it)
        localStorage.setItem('token', res.token);

        // 2. Tell the auth service the user is logged in
        this.authServ.setCurrentUser(res);

        console.log('Login Completed');
      }
    }
    // 3. Redirect
    // this.router.navigate(['/']);
  }

  private handleLoginError(err: unknown) {
  //   //this.errorMessage = err.error?.message ?? "Login failed";
  //   const error = err.error?.message ?? "Login failed";
  //   console.log(error);
    console.log(err);
  }
}
