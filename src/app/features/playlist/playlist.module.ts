import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { PlaylistComponent } from './components';

@NgModule({
    declarations: [
        PlaylistComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        PlaylistComponent
    ]
})
export class PlaylistModule {}
