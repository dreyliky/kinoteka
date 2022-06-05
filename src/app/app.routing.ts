import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteEnum } from '@enums/app-route.enum';

const routes: Routes = [
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
        path: AppRouteEnum.Downloads,
        loadChildren: () => import('./pages/downloads').then((m) => m.DownloadsModule)
    },
    {
        path: AppRouteEnum.Settings,
        loadChildren: () => import('./pages/settings').then((m) => m.SettingsModule)
    },
    {
        path: '**',
        redirectTo: AppRouteEnum.Films
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
