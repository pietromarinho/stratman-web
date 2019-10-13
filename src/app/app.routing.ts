import { Routes } from '@angular/router';
import { AdminLayoutComponent } from 'app/layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from 'app/layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            }
        ]
    }
    // , {
    //     path: '',
    //     component: AuthLayoutComponent,
    //     children: [{

    //         path: 'pages',
    //         loadChildren: './pages/pages.module#PagesModule'
    //     }]
    // }
];
