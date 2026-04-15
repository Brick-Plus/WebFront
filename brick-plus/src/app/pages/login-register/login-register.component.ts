import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss'
})
export class LoginRegisterComponent {

  private fb = inject(FormBuilder);
  private location = inject(Location);

  showPassword = false;

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(10)]]
  });

  goBack() {
    this.location.back();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();
    console.log('Connexion:', { email, password });

    // appel API ici
  }

  forgotPassword() {
    const email = this.loginForm.get('email')?.value || '';
    console.log('Mot de passe oublié pour:', email);
    // Rediriger vers page de réinitialisation
    // this.router.navigate(['/forgot-password'], { queryParams: { email } });
  }

  continueWithGoogle() {
    console.log('Google login');
    // OAuth Google ici
  }

}

