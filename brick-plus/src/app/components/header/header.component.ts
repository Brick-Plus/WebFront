import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  protected isMenuOpen = false;

  protected readonly navigationLinks = [
    'Accueil',
    'Boutique',
    'Vendre mes LEGO',
    "L'application",
    'À propos de Brick +'
  ];

  protected toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  protected closeMenu(): void {
    this.isMenuOpen = false;
  }
}