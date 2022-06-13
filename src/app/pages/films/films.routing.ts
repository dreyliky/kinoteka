import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsRoutingEnum } from './enums';
import { FilmsComponent } from './films.component';

const routes: Routes = [
    {
        path: '',
        component: FilmsComponent,
        children: [
            {
                path: FilmsRoutingEnum.Online,
                loadChildren: () => import('./containers/online').then((m) => m.OnlineModule)
            },
            {
                path: FilmsRoutingEnum.Downloaded,
                loadChildren: () => import('./containers/downloaded').then((m) => m.DownloadedModule)
            },
            {
                path: FilmsRoutingEnum.Favorites,
                loadChildren: () => import('./containers/favorites').then((m) => m.FavoritesModule)
            },
            {
                path: '**',
                redirectTo: FilmsRoutingEnum.Online,
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class FilmsRouting {}
