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
                path: FilmsRoutingEnum.Downloaded,
                loadChildren: () => import('./containers/downloaded').then((m) => m.DownloadedModule)
            },
            {
                path: FilmsRoutingEnum.Online,
                loadChildren: () => import('./containers/online').then((m) => m.OnlineModule)
            },
            {
                path: FilmsRoutingEnum.Playlists,
                loadChildren: () => import('./containers/playlists').then((m) => m.PlaylistsModule)
            },
            {
                path: FilmsRoutingEnum.Favorites,
                loadChildren: () => import('./containers/favorites').then((m) => m.FavoritesModule)
            },
            {
                path: FilmsRoutingEnum.Playlist,
                loadChildren: () => import('./containers/playlist-films').then((m) => m.PlaylistFilmsModule)
            },
            {
                path: '**',
                redirectTo: FilmsRoutingEnum.Downloaded,
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
