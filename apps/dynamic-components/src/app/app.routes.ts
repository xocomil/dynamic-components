import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('@dash/dashboard').then((m) => m.DashboardComponent),
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];
