import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginRegisterComponent } from './login-register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';

describe('LoginRegisterComponent', () => {
  let component: LoginRegisterComponent;
  let fixture: ComponentFixture<LoginRegisterComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginRegisterComponent,
        RouterTestingModule,
        ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginRegisterComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  describe('Initialisation', () => {
    it('devrait créer le composant', () => {
      expect(component).toBeTruthy();
    });

    it('devrait démarrer en mode connexion', () => {
      expect(component.isLoginMode).toBe(true);
    });

    it('devrait avoir les mots de passe masqués par défaut', () => {
      expect(component.showPassword).toBe(false);
      expect(component.showPasswordConfirm).toBe(false);
    });

    it('devrait initialiser les formulaires vides', () => {
      expect(component.loginForm.get('email')?.value).toBe('');
      expect(component.loginForm.get('password')?.value).toBe('');
      expect(component.registerForm.get('email')?.value).toBe('');
      expect(component.registerForm.get('password')?.value).toBe('');
      expect(component.registerForm.get('passwordConfirm')?.value).toBe('');
    });
  });

  describe('Toggle Mode', () => {
    it('devrait basculer vers le mode inscription', () => {
      component.toggleMode();
      expect(component.isLoginMode).toBe(false);
    });

    it('devrait basculer vers le mode connexion', () => {
      component.isLoginMode = false;
      component.toggleMode();
      expect(component.isLoginMode).toBe(true);
    });

    it('devrait réinitialiser la visibilité des mots de passe lors du changement de mode', () => {
      component.showPassword = true;
      component.showPasswordConfirm = true;
      component.toggleMode();
      expect(component.showPassword).toBe(false);
      expect(component.showPasswordConfirm).toBe(false);
    });
  });

  describe('Visibilité des mots de passe', () => {
    it('devrait basculer la visibilité du mot de passe', () => {
      expect(component.showPassword).toBe(false);
      component.togglePasswordVisibility();
      expect(component.showPassword).toBe(true);
      component.togglePasswordVisibility();
      expect(component.showPassword).toBe(false);
    });

    it('devrait basculer la visibilité de la confirmation', () => {
      expect(component.showPasswordConfirm).toBe(false);
      component.togglePasswordConfirmVisibility();
      expect(component.showPasswordConfirm).toBe(true);
    });
  });

  describe('Validation Email', () => {
    const testCases = [
      { email: 'test@example.com', valid: true, description: 'email valide standard' },
      { email: 'user.name@domain.fr', valid: true, description: 'email avec point dans la partie locale' },
      { email: 'test@domain', valid: false, description: 'email sans extension' },
      { email: 'test@@domain.com', valid: false, description: 'email avec double @' },
      { email: 'test@domain..com', valid: false, description: 'email avec points consécutifs' },
      { email: '.test@domain.com', valid: false, description: 'email commençant par un point' },
      { email: 'test.@domain.com', valid: false, description: 'email avec point avant @' },
      { email: 'test@.domain.com', valid: false, description: 'email avec point après @' },
      { email: 'test@domain.c', valid: false, description: 'extension trop courte' },
      { email: 'test@domain.123', valid: false, description: 'extension numérique' },
      { email: '@domain.com', valid: false, description: 'partie locale manquante' },
      { email: 'test@.com', valid: false, description: 'nom de domaine manquant' },
      { email: 'test@sub.domain.com', valid: false, description: 'sous-domaine (multi-niveau)' },
    ];

    testCases.forEach(({ email, valid, description }) => {
      it(`devrait ${valid ? 'accepter' : 'rejeter'} ${description}: "${email}"`, () => {
        component.loginForm.get('email')?.setValue(email);
        component.loginForm.get('email')?.markAsTouched();

        if (valid) {
          expect(component.loginForm.get('email')?.valid).toBe(true);
        } else {
          expect(component.loginForm.get('email')?.invalid).toBe(true);
        }
      });
    });

    it('ne devrait pas valider un email vide ou avec espaces seulement', () => {
      const validator = component.emailValidator();
      expect(validator({ value: '' } as any)).toBeNull();
      expect(validator({ value: '   ' } as any)).toBeNull();
    });
  });

  describe('Validation Mot de passe fort', () => {
    const passwordTestCases = [
      { password: 'Abcdefgh1!', valid: true, description: 'mot de passe valide complet' },
      { password: 'Short1!', valid: false, errors: ['minlength'], description: 'trop court' },
      { password: 'ABCDEFGH1!', valid: false, errors: ['lowercase'], description: 'sans minuscule' },
      { password: 'abcdefgh1!', valid: false, errors: ['uppercase'], description: 'sans majuscule' },
      { password: 'Abcdefghij!', valid: false, errors: ['number'], description: 'sans chiffre' },
      { password: 'Abcdefgh12', valid: false, errors: ['special'], description: 'sans caractère spécial' },
      { password: 'abc', valid: false, errors: ['minlength', 'uppercase', 'number', 'special'], description: 'multiple erreurs' },
    ];

    passwordTestCases.forEach(({ password, valid, errors, description }) => {
      it(`devrait ${valid ? 'accepter' : 'rejeter'} ${description}: "${password}"`, () => {
        component.registerForm.get('password')?.setValue(password);
        component.registerForm.get('password')?.markAsTouched();

        const control = component.registerForm.get('password');
        if (valid) {
          expect(control?.valid).toBe(true);
        } else {
          expect(control?.invalid).toBe(true);
          errors?.forEach(error => {
            expect(control?.errors?.[error]).toBe(true);
          });
        }
      });
    });
  });

  describe('Soumission Login', () => {
    beforeEach(() => {
      component.isLoginMode = true;
    });

    it('devrait rejeter un formulaire invalide', () => {
      spyOn(console, 'log');
      component.loginForm.get('email')?.setValue('');
      component.loginForm.get('password')?.setValue('');

      component.submit();

      expect(component.loginForm.touched).toBe(true);
      expect(console.log).not.toHaveBeenCalledWith('Connexion:', jasmine.any(Object));
    });

    it('devrait accepter un formulaire valide', () => {
      spyOn(console, 'log');
      component.loginForm.get('email')?.setValue('test@example.com');
      component.loginForm.get('password')?.setValue('Password123!');

      component.submit();

      expect(console.log).toHaveBeenCalledWith('Connexion:', {
        email: 'test@example.com',
        password: 'Password123!'
      });
    });

    it('devrait marquer tous les champs comme touchés si invalide', () => {
      component.submit();

      expect(component.loginForm.get('email')?.touched).toBe(true);
      expect(component.loginForm.get('password')?.touched).toBe(true);
    });
  });

  describe('Soumission Register', () => {
    beforeEach(() => {
      component.isLoginMode = false;
    });

    it('devrait rejeter si les mots de passe ne correspondent pas', () => {
      spyOn(console, 'log');
      component.registerForm.get('email')?.setValue('test@example.com');
      component.registerForm.get('password')?.setValue('Password123!');
      component.registerForm.get('passwordConfirm')?.setValue('DifferentPass1!');

      component.submit();

      expect(component.registerForm.get('passwordConfirm')?.errors?.['mismatch']).toBe(true);
    });

    it('devrait accepter si tout est valide et les mots de passe correspondent', () => {
      spyOn(console, 'log');
      component.registerForm.get('email')?.setValue('test@example.com');
      component.registerForm.get('password')?.setValue('Password123!');
      component.registerForm.get('passwordConfirm')?.setValue('Password123!');

      component.submit();

      expect(console.log).toHaveBeenCalledWith('Inscription:', {
        email: 'test@example.com',
        password: 'Password123!'
      });
    });
  });

  describe('Forgot Password', () => {
    it('devrait logger l\'email pour réinitialisation', () => {
      spyOn(console, 'log');
      component.loginForm.get('email')?.setValue('test@example.com');

      component.forgotPassword();

      expect(console.log).toHaveBeenCalledWith('Mot de passe oublié pour:', 'test@example.com');
    });

    it('devrait gérer un email vide', () => {
      spyOn(console, 'log');
      component.loginForm.get('email')?.setValue('');

      component.forgotPassword();

      expect(console.log).toHaveBeenCalledWith('Mot de passe oublié pour:', '');
    });
  });

  describe('Continue with Google', () => {
    it('devrait logger la tentative de connexion Google', () => {
      spyOn(console, 'log');
      component.continueWithGoogle();
      expect(console.log).toHaveBeenCalledWith('Google login');
    });
  });

  describe('Navigation', () => {
    it('devrait appeler location.back() lors du retour', () => {
      spyOn(location, 'back');
      component.goBack();
      expect(location.back).toHaveBeenCalled();
    });
  });
});
