import { Routes } from '@angular/router';

// Components
import { homeRoutes } from './pages/home/home.routes';
import { HomeComponent } from './pages/home/home.component';

import { MyAccountComponent } from '@pages/my-account/my-account.component';

import { loginRoutes } from './pages/login/login.routes';
import { LoginComponent } from './pages/login/login.component';

import { registerRoutes } from './pages/register/register.routes';
import { RegisterComponent } from './pages/register/register.component';

// Guards
import { authenticatorGuard } from './guards/authenticator.guard';
import { isAuthenticatedGuard } from './guards/isAuthenticated.guard';

export const routes: Routes = [
  {
    path: 'main',
    component: HomeComponent,
    canActivate: [authenticatorGuard],
    children: homeRoutes,
  },
  {
    path: 'account',
    canActivate: [authenticatorGuard],
    component: MyAccountComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [isAuthenticatedGuard],
    children: loginRoutes,
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [isAuthenticatedGuard],
    children: registerRoutes,
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
];
