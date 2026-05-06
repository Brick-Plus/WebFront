import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {
  form = {
    prenom: '', nom: '', nomProfil: '',
    telephone: '', email: '', emailRecup: '',
    mdpActuel: '', mdpNouveau: '', mdpConfirm: ''
  };

  onSubmit(): void {
    console.log('Formulaire soumis', this.form);
    // appel API ici
  }
}