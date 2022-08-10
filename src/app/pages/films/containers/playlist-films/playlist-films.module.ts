import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { FilmsSharedModule } from '../../shared';
import { HeaderPortalContentComponent } from './components';
import { PlaylistFilmsComponent } from './playlist-films.component';
import { PlaylistFilmsRouting } from './playlist-films.routing';

@NgModule({
    declarations: [
        PlaylistFilmsComponent,
        HeaderPortalContentComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        FilmsSharedModule,
        PlaylistFilmsRouting
    ]
})
export class PlaylistFilmsModule {}
