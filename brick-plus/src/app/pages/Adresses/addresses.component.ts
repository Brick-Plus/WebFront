import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AddressForm {
  prenom: string; nom: string; entreprise: string;
  pays: string; rue: string; complement: string;
  codePostal: string; ville: string;
}

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent {
  openForm: 'facturation' | 'livraison' | null = null;

  facturation: AddressForm = { prenom: '', nom: '', entreprise: '', pays: '', rue: '', complement: '', codePostal: '', ville: '' };
  livraison: AddressForm = { prenom: '', nom: '', entreprise: '', pays: '', rue: '', complement: '', codePostal: '', ville: '' };

  toggleForm(type: 'facturation' | 'livraison'): void {
    this.openForm = this.openForm === type ? null : type;
  }

  onSubmit(type: string): void {
    console.log(`Adresse ${type} sauvegardée`, type === 'facturation' ? this.facturation : this.livraison);
  }
}