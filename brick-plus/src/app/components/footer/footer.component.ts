import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  protected readonly storeLinks = ['Sets & Figurines', 'Thèmes', 'Vrac'];
  protected readonly helpLinks = [
    'Rachat de LEGO',
    'Mon compte',
    'Retours et remboursements',
    'Mentions légales',
    'Politique de confidentialité',
    'CGV'
  ];
}