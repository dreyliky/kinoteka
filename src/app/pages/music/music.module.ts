import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MusicComponent } from './music.component';
import { MusicRouting } from './music.routing';

@NgModule({
    declarations: [
        MusicComponent
    ],
    imports: [
        SharedModule,
        MusicRouting
    ]
})
export class MusicModule {}
