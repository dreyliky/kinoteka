import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { FilmsSharedModule } from '../../shared';
import { HeaderPortalContentComponent, PlaylistsListComponent } from './components';
import { PlaylistsPageComponent } from './playlists.component';
import { PlaylistsRouting } from './playlists.routing';

@NgModule({
    declarations: [
        HeaderPortalContentComponent,
        PlaylistsPageComponent,
        PlaylistsListComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        FilmsSharedModule,
        PlaylistsRouting
    ]
})
export class PlaylistsModule {}
