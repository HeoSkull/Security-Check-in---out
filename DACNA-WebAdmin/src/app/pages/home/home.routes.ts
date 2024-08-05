import { Routes } from '@angular/router';

// module
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { GroupsComponent } from './modules/groups/groups.component';
import { GroupComponent } from './modules/group/group.component';

export const homeRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
  },
  {
    path: 'groups',
    component: GroupsComponent,
    title: 'Groups',
  },
  {
    path: 'group/:id',
    component: GroupComponent,
    title: 'Group',
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
