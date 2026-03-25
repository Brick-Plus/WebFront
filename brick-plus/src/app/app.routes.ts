import { Routes } from '@angular/router';
import { LoginRegisterPageComponent } from './pages/login-register/login-register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { Produits } from './pages/produits/produits.component';
import { SetCompletComponent } from './pages/set-complet/set-complet.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'connexion', component: LoginRegisterPageComponent },
  { path: 'inscription', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'produits', component: Produits},
  { path: 'set-complet', component: SetCompletComponent }
];
