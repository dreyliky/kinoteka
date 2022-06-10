import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { MainLayoutComponent } from '@layouts';

const routes: Routes = [
    {
        path: AppRouteEnum.WatchOnlineFilm,
        loadChildren: () => import('./pages/online-film-details').then((m) => m.OnlineFilmDetailsModule)
    },
    {
        path: AppRouteEnum.WatchDownloadedFilm,
        loadChildren: () => import('./pages/downloaded-film-details').then((m) => m.DownloadedFilmDetailsModule)
    },
    {
        path: AppRouteEnum.WatchOnlineTvSeries,
        loadChildren: () => import('./pages/online-tv-series-details').then((m) => m.OnlineTvSeriesDetailsModule)
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: AppRouteEnum.Films,
                loadChildren: () => import('./pages/films').then((m) => m.FilmsModule)
            },
            {
                path: AppRouteEnum.TvSeries,
                loadChildren: () => import('./pages/tv-series').then((m) => m.TvSeriesModule)
            },
            {
                path: AppRouteEnum.Video,
                loadChildren: () => import('./pages/video').then((m) => m.VideoModule)
            },
            {
                path: AppRouteEnum.Music,
                loadChildren: () => import('./pages/music').then((m) => m.MusicModule)
            },
            {
                path: AppRouteEnum.Settings,
                loadChildren: () => import('./pages/settings').then((m) => m.SettingsModule)
            },
            {
                path: '**',
                redirectTo: AppRouteEnum.Films
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
    constructor(
        private readonly router: Router
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }
}
