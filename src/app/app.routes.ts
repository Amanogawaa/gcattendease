import { Routes } from '@angular/router';
import { UserComponent } from './modules/user/user.component';
import { OrganizerComponent } from './modules/organizer/organizer.component';
import { authenGuard } from './core/authen.guard';
import { AdminDashboardComponent } from './modules/admin/pages/admin-dashboard/admin-dashboard.component';
import { SignupComponent } from './auth/pages/signup/signup.component';
import { LoginComponent } from './auth/pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'signup',
    component: SignupComponent,
  },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [authenGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import(
            './modules/admin/pages/admin-dashboard/admin-dashboard.component'
          ).then((c) => c.AdminDashboardComponent),
      },
    ],
  },

  {
    path: 'student',
    component: UserComponent,
    canActivate: [authenGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./modules/user/pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },

      {
        path: 'events',
        loadComponent: () =>
          import('./modules/user/pages/events/events.component').then(
            (c) => c.EventsComponent
          ),
      },

      {
        path: 'profile',
        loadComponent: () =>
          import('./modules/user/pages/profile/profile.component').then(
            (c) => c.ProfileComponent
          ),
      },

      {
        path: 'attendance',
        loadComponent: () =>
          import('./modules/user/pages/attendance/attendance.component').then(
            (c) => c.AttendanceComponent
          ),
      },

      {
        path: 'feedback',
        loadComponent: () =>
          import('./modules/user/pages/feedback/feedback.component').then(
            (c) => c.FeedbackComponent
          ),
      },
    ],
  },

  {
    path: 'organizer',
    component: OrganizerComponent,
    canActivate: [authenGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },

      {
        path: 'dashboard',
        loadComponent: () =>
          import(
            './modules/organizer/pages/org-dashboard/org-dashboard.component'
          ).then((c) => c.OrgDashboardComponent),
      },

      {
        path: 'events',
        loadComponent: () =>
          import(
            './modules/organizer/pages/org-event/org-event.component'
          ).then((c) => c.OrgEventComponent),
      },

      {
        path: 'attendance',
        loadComponent: () =>
          import(
            './modules/organizer/pages/attendance/attendance.component'
          ).then((c) => c.AttendanceComponent),
      },
    ],
  },
];
