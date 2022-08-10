import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistFilmsParamEnum } from './enums';
import { PlaylistFilmsComponent } from './playlist-films.component';

const routes: Routes = [
    {
        path: `:${PlaylistFilmsParamEnum.PlaylistId}`,
        component: PlaylistFilmsComponent,
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
export class PlaylistFilmsRouting {}
