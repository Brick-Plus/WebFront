import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SetneufComponent } from './pages/setneuf.component/setneuf.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'pages/setneuf', component: SetneufComponent },
  { path: 'setneuf', component: SetneufComponent },
];
