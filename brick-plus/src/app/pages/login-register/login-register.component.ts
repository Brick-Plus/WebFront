import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
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

  isLoginMode = true;
  showPassword = false;
  showPasswordConfirm = false;

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, this.emailValidator()]],
    password: ['', [Validators.required, Validators.minLength(10)]]
  });

  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, this.emailValidator()]],
    password: ['', [Validators.required, this.strongPasswordValidator()]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(10)]]
  });

  emailValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // Ne pas valider si vide ou seulement des espaces
      if (!value || !value.trim()) {
        return null;
      }

      const errors: ValidationErrors = {};

      // Vérifier qu'il n'y a qu'un seul "@"
      const atCount = (value.match(/@/g) || []).length;
      if (atCount !== 1) {
        errors['multipleAt'] = true;
        return errors;
      }

      // Vérifier pas de ".." (points consécutifs)
      if (value.includes('..')) {
        errors['consecutiveDots'] = true;
        return errors;
      }

      // Vérifier pas de "." au début
      if (value.startsWith('.')) {
        errors['startsWithDot'] = true;
        return errors;
      }

      // Vérifier pas de "." à la fin
      if (value.endsWith('.')) {
        errors['endsWithDot'] = true;
        return errors;
      }

      const [localPart, domain] = value.split('@');

      // Vérifier la partie avant @
      if (!localPart) {
        errors['noLocalPart'] = true;
        return errors;
      }

      // Vérifier pas de "." directement avant "@"
      if (localPart.endsWith('.')) {
        errors['dotBeforeAt'] = true;
        return errors;
      }

      // Vérifier la partie après @
      if (!domain) {
        errors['noDomain'] = true;
        return errors;
      }

      // Vérifier pas de "." directement après "@"
      if (domain.startsWith('.')) {
        errors['dotAfterAt'] = true;
        return errors;
      }

      // Vérifier la présence d'une extension
      if (!domain.includes('.')) {
        errors['noExtension'] = true;
        return errors;
      }

      // Vérifier qu'il n'y a qu'une seule extension (pas de domaines multi-niveaux)
      const domainParts = domain.split('.');
      if (domainParts.length !== 2) {
        errors['multipleExtensions'] = true;
        return errors;
      }

      const [domainName, extension] = domainParts;

      // Vérifier que le domainName n'est pas vide
      if (!domainName) {
        errors['noDomainName'] = true;
        return errors;
      }

      // Vérifier que l'extension est valide (au moins 2 caractères, uniquement des lettres)
      if (!extension || extension.length < 2 || !/^[a-zA-Z]+$/.test(extension)) {
        errors['invalidExtension'] = true;
        return errors;
      }

      return Object.keys(errors).length > 0 ? errors : null;
    };
  }

  strongPasswordValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // Ne pas valider si vide ou seulement des espaces
      if (!value || !value.trim()) {
        return null;
      }

      const errors: ValidationErrors = {};

      if (value.length < 10) {
        errors['minlength'] = true;
      }

      if (!/[a-z]/.test(value)) {
        errors['lowercase'] = true;
      }

      if (!/[A-Z]/.test(value)) {
        errors['uppercase'] = true;
      }

      if (!/[0-9]/.test(value)) {
        errors['number'] = true;
      }

      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
        errors['special'] = true;
      }

      return Object.keys(errors).length > 0 ? errors : null;
    };
  }

  goBack() {
    this.location.back();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordConfirmVisibility() {
    this.showPasswordConfirm = !this.showPasswordConfirm;
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.showPassword = false;
    this.showPasswordConfirm = false;
  }

  submit() {
    if (this.isLoginMode) {
      this.submitLogin();
    } else {
      this.submitRegister();
    }
  }

  submitLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();
    console.log('Connexion:', { email, password });

    // appel API ici
  }

  submitRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { email, password, passwordConfirm } = this.registerForm.getRawValue();

    if (password !== passwordConfirm) {
      console.log('Les mots de passe ne correspondent pas');
      // Marquer le champ de confirmation comme invalide
      this.registerForm.get('passwordConfirm')?.setErrors({ mismatch: true });
      return;
    }

    console.log('Inscription:', { email, password });

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
