import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { Produits } from './pages/produits/produits.component';
import { SetCompletComponent } from './pages/set-complet/set-complet.component';
import { AvisComponent } from './components/avis/avis.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'register', component: LoginRegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'products', component: Produits },
  { path: 'complete-set', component: SetCompletComponent },
  { path: 'avis', component: AvisComponent},
  { path: 'catalogue', component: CatalogueComponent},
  { path: 'produitCard', component: ProductCardComponent },
  { path: 'product/:id', component: ProductDetailComponent }
];
