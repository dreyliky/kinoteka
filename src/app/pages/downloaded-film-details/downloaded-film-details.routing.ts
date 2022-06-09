import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadedFilmDetailsComponent } from './downloaded-film-details.component';
import { DownloadedFilmDetailsRouteParamEnum } from './enums';

const routes: Routes = [
    {
        path: `:${DownloadedFilmDetailsRouteParamEnum.KinopoiskId}`,
        component: DownloadedFilmDetailsComponent
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
export class DownloadedFilmDetailsRouting {}
