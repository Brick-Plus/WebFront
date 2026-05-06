import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FooterComponent } from "../../components/footer/footer.component.spec";
import { filter } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  pageTitle = 'Profil';

  private titles: Record<string, string> = {
    'parametres': 'Paramètres de compte',
    'adresses': 'Adresses',
    'paiement': 'Moyen de paiement',
    'favoris': 'Favoris',
    'commandes': 'Mes commandes',
  };
  constructor(private router: Router) {

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      const segment = e.url.split('/').pop();
      this.pageTitle = this.titles[segment] || 'Profil';
    });
  
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
