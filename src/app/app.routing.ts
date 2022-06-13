import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { MainLayoutComponent } from '@layouts';

const routes: Routes = [
    {
        path: AppRouteEnum.Watch,
        loadChildren: () => import('./pages/watch').then((m) => m.WatchModule)
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
                path: AppRouteEnum.DownloadingMedia,
                loadChildren: () => import('./pages/downloading-media').then((m) => m.DownloadingMediaModule)
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
