import { CustomFormGroup } from '@rs/forms';
import { Directive, inject, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base-component';
import { UserDto } from '../../models/dtos/user.dto';
import { AuthService } from '../../../core/services/auth/auth.service';

@Directive()
export abstract class BaseAuthComponent<TRequest extends UserDto> extends BaseComponent<TRequest> implements OnInit, OnDestroy {
  private authService = inject(AuthService);

  protected abstract createForm(): CustomFormGroup;

  ngOnInit(): void {
    this.form = this.createForm();
  }

  submit<TRequest extends UserDto>(req: TRequest) {
    this.authService.login(req).subscribe({
       next: (res) => this.handleLoginSuccess(res),
       error: (err) => this.handleLoginError(err)
    });
  }

  private handleLoginSuccess(res: UserDto) {

    if(res != null) {

      if(res.token) {
        // 1. Save token (if backend returned it)
        localStorage.setItem('token', res.token);

        // 2. Tell the auth service the user is logged in
        this.authService.setCurrentUser(res);

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
