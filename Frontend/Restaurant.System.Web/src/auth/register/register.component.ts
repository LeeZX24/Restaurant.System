import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SHARED_FORM_MODULE, SHARED_IMPORTS } from '../../app/shared/shared.module';

@Component({
  selector: 'rs-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
  imports:
  [...SHARED_IMPORTS, ...SHARED_FORM_MODULE]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  submit() {
    if (this.form.invalid) return;

    if (this.form.value.password !== this.form.value.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    console.log('Register payload:', this.form.value);
    // this.authService.register(...)
  }
}
