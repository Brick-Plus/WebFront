import { render, screen, fireEvent } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { LoginRegisterComponent } from './login-register.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginRegisterComponent Integration', () => {

  async function setup() {
    return render(LoginRegisterComponent, {
      imports: [RouterTestingModule]
    });
  }

  describe('Affichage initial', () => {
    it('devrait afficher le formulaire de connexion par défaut', async () => {
      await setup();

      expect(screen.getByText('Se connecter')).toBeInTheDocument();
      expect(screen.getByText('Accédez à votre espace personnel')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Saisissez votre e-mail')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Saisissez votre mot de passe')).toBeInTheDocument();
      expect(screen.getByText('Mot de passe oublié ?')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument();
    });

    it('devrait afficher le bouton Google', async () => {
      await setup();
      expect(screen.getByText('Continuer avec Google')).toBeInTheDocument();
    });

    it('devrait afficher le lien vers inscription', async () => {
      await setup();
      expect(screen.getByText('Pas encore de compte ?')).toBeInTheDocument();
      expect(screen.getByText('Créer un compte')).toBeInTheDocument();
    });
  });

  describe('Basculement vers inscription', () => {
    it('devrait afficher le formulaire d\'inscription après clic', async () => {
      const user = userEvent.setup();
      await setup();

      await user.click(screen.getByRole('button', { name: /créer un compte/i }));

      expect(screen.getByRole('heading', { name: /créer un compte/i })).toBeInTheDocument();
      expect(screen.getByText('Rejoignez la communauté Brick+')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Confirmez votre mot de passe')).toBeInTheDocument();
    });

    it('devrait revenir au formulaire de connexion', async () => {
      const user = userEvent.setup();
      await setup();

      await user.click(screen.getByRole('button', { name: /créer un compte/i }));
      await user.click(screen.getByRole('button', { name: /connexion/i }));

      expect(screen.getByRole('heading', { name: /se connecter/i })).toBeInTheDocument();
    });
  });

  describe('Interactions formulaire connexion', () => {
    it('devrait permettre de saisir email et mot de passe', async () => {
      const user = userEvent.setup();
      await setup();

      const emailInput = screen.getByPlaceholderText('Saisissez votre e-mail');
      const passwordInput = screen.getByPlaceholderText('Saisissez votre mot de passe');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'Password123!');

      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('Password123!');
    });

    it('devrait basculer la visibilité du mot de passe', async () => {
      const user = userEvent.setup();
      await setup();

      const passwordInput = screen.getByPlaceholderText('Saisissez votre mot de passe');
      const toggleBtn = screen.getByRole('button', { name: '' }); // Le bouton toggle n'a pas de texte

      expect(passwordInput).toHaveAttribute('type', 'password');

      // Trouver le bouton toggle par sa position relative
      const toggleButtons = document.querySelectorAll('.login__password-toggle');
      await user.click(toggleButtons[0]);

      expect(passwordInput).toHaveAttribute('type', 'text');
    });

    it('devrait afficher erreur email invalide après blur', async () => {
      const user = userEvent.setup();
      await setup();

      const emailInput = screen.getByPlaceholderText('Saisissez votre e-mail');

      await user.type(emailInput, 'invalid-email');
      await user.tab(); // Trigger blur

      expect(await screen.findByText('Veuillez entrer une adresse e-mail valide')).toBeInTheDocument();
    });
  });

  describe('Interactions formulaire inscription', () => {
    it('devrait afficher les critères de mot de passe non respectés', async () => {
      const user = userEvent.setup();
      await setup();

      await user.click(screen.getByRole('button', { name: /créer un compte/i }));

      const passwordInput = screen.getByPlaceholderText('Saisissez votre mot de passe');
      await user.type(passwordInput, 'weak');
      await user.tab();

      expect(await screen.findByText('Le mot de passe doit contenir :')).toBeInTheDocument();
      expect(screen.getByText('Au moins 10 caractères')).toBeInTheDocument();
      expect(screen.getByText('Au moins une lettre majuscule (A-Z)')).toBeInTheDocument();
      expect(screen.getByText('Au moins un chiffre (0-9)')).toBeInTheDocument();
      expect(screen.getByText('Au moins un caractère spécial (!@#$%^&*)')).toBeInTheDocument();
    });

    it('devrait afficher erreur si mots de passe ne correspondent pas', async () => {
      const user = userEvent.setup();
      await setup();

      await user.click(screen.getByRole('button', { name: /créer un compte/i }));

      const passwordInput = screen.getByPlaceholderText('Saisissez votre mot de passe');
      const confirmInput = screen.getByPlaceholderText('Confirmez votre mot de passe');

      await user.type(passwordInput, 'Password123!');
      await user.type(confirmInput, 'Different123!');

      // Soumettre le formulaire
      await user.click(screen.getByRole('button', { name: /créer un compte/i }));

      expect(await screen.findByText('Les mots de passe ne correspondent pas')).toBeInTheDocument();
    });
  });
});
