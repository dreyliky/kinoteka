import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadedFilmComponent } from './downloaded-film.component';
import { DownloadedFilmDetailsRouteParamEnum } from './enums';

const routes: Routes = [
    {
        path: `:${DownloadedFilmDetailsRouteParamEnum.KinopoiskId}`,
        component: DownloadedFilmComponent
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
export class DownloadedFilmRouting {}
