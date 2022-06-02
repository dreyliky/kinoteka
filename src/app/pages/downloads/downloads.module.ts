import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DownloadsComponent } from './downloads.component';
import { DownloadsRouting } from './downloads.routing';
import { FilmCardComponent } from './film-card';
import { FilmDetailsWindowComponent } from './film-details-window';

@NgModule({
    declarations: [
        FilmDetailsWindowComponent,
        DownloadsComponent,
        FilmCardComponent
    ],
    imports: [
        DownloadsRouting,
        SharedModule
    ]
})
export class DownloadsModule {}
