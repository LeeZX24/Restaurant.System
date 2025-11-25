import { Component, inject } from '@angular/core';
import { Validators, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../app/core/services/auth.service/auth.service';
import { UserDto } from '../../app/shared/models/dtos/user.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports:
  [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LoginComponent {
  private authServ = inject(AuthService);

  loginForm = new FormGroup({
    email : new FormControl('',{validators: [Validators.required, Validators.email], nonNullable: true}),
    password: new FormControl('',{validators: [Validators.required], nonNullable: true},),
  });

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

  private handleLoginError(err: any) {
    //this.errorMessage = err.error?.message ?? "Login failed";
    const error = err.error?.message ?? "Login failed";
    console.log(error);
  }
}
