import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout/layout.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';

export const routes: Routes = [
  // default route
  // {
  //   path: '',
  //   component: LayoutComponent,
  //   children: [
  //     {
  //       path: 'auth',
  //       loadChildren: () => import('../auth/auth.routes').then(c => c.AuthRoutes),
  //     },
  //   ],
  // },
  {
    path: 'login',
    component: LayoutComponent,
    children:[
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'register',
    component: LayoutComponent,
    children:[
      {
        path: '',
        component: RegisterComponent
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      }
    ]
  }
];
