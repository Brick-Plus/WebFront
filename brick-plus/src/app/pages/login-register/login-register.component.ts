import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss'
})
export class LoginRegisterComponent {

  private fb = inject(FormBuilder);
  private location = inject(Location);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  goBack() {
    this.location.back();
  }

  continueWithEmail() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.loginForm.getRawValue().email;

    console.log('Connexion email:', email);

    // appel API ici
  }

  continueWithGoogle() {
    console.log('Google login');
    // OAuth Google ici
  }

}
