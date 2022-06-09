import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineFilmDetailsRouteParamEnum } from './enums';
import { OnlineFilmDetailsComponent } from './online-film-details.component';

const routes: Routes = [
    {
        path: `:${OnlineFilmDetailsRouteParamEnum.KinopoiskId}`,
        component: OnlineFilmDetailsComponent
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
export class OnlineFilmDetailsRouting {}
