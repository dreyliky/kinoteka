import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TvSeriesRoutingEnum } from './enums';
import { TvSeriesComponent } from './tv-series.component';

const routes: Routes = [
    {
        path: '',
        component: TvSeriesComponent,
        children: [
            {
                path: TvSeriesRoutingEnum.Online,
                loadChildren: () => import('./containers/online').then((m) => m.OnlineModule)
            },
            {
                path: TvSeriesRoutingEnum.Downloads,
                loadChildren: () => import('./containers/downloads').then((m) => m.DownloadsModule)
            },
            {
                path: TvSeriesRoutingEnum.Favorites,
                loadChildren: () => import('./containers/favorites').then((m) => m.FavoritesModule)
            },
            {
                path: '**',
                redirectTo: TvSeriesRoutingEnum.Online,
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
export class TvSeriesRouting {}
