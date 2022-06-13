import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineFilmDetailsRouteParamEnum } from './enums';
import { OnlineFilmComponent } from './online-film.component';

const routes: Routes = [
    {
        path: `:${OnlineFilmDetailsRouteParamEnum.KinopoiskId}`,
        component: OnlineFilmComponent
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
export class OnlineFilmRouting {}
