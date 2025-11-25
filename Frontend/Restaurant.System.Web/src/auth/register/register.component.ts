import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
  imports:
  [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
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
