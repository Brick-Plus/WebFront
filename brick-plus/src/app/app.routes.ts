import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { Produits } from './pages/produits/produits.component';
import { SetCompletComponent } from './pages/set-complet/set-complet.component';

export const routes: Routes = [
  { path: '', redirectTo: '/produits', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'produits', component: Produits},
  { path: 'set-complet', component: SetCompletComponent }
];
