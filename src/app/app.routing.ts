import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { MainLayoutComponent } from '@layouts';

const routes: Routes = [
    {
        path: AppRouteEnum.OnlineFilmDetails,
        loadChildren: () => import('./pages/online-film-details').then((m) => m.OnlineFilmDetailsModule)
    },
    {
        path: AppRouteEnum.DownloadedFilmDetails,
        loadChildren: () => import('./pages/downloaded-film-details').then((m) => m.DownloadedFilmDetailsModule)
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
export class AppRoutingModule {}
