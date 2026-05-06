import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  formOpen = true;
  selectedMethod: 'carte' | 'paypal' | 'virement' = 'carte';

  card = { numero: '', expiration: '', cvc: '' };
  billing = { prenom: '', nom: '', entreprise: '', pays: '' };

  toggleForm(): void { this.formOpen = !this.formOpen; }
  onSubmit(): void { console.log('Paiement', this.selectedMethod, this.card, this.billing); }
}