import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistsPageComponent } from './playlists.component';

const routes: Routes = [
    {
        path: '',
        component: PlaylistsPageComponent,
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
export class PlaylistsRouting {}
