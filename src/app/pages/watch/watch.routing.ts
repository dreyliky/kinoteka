import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchRoutingEnum } from './enums';

const routes: Routes = [
    {
        path: WatchRoutingEnum.OnlineFilm,
        loadChildren: () => import('./containers/online-film').then((m) => m.OnlineFilmModule)
    },
    {
        path: WatchRoutingEnum.DownloadedFilm,
        loadChildren: () => import('./containers/downloaded-film').then((m) => m.DownloadedFilmModule)
    },
    {
        path: WatchRoutingEnum.OnlineTvSeries,
        loadChildren: () => import('./containers/online-tv-series').then((m) => m.OnlineTvSeriesModule)
    },
    {
        path: WatchRoutingEnum.DownloadedVideo,
        loadChildren: () => import('./containers/downloaded-video').then((m) => m.DownloadedVideoModule)
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
export class WatchRouting {}
