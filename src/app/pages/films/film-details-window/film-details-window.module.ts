import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DownloadButtonComponent } from './download-button';
import { FilmDetailsWindowComponent } from './film-details-window.component';
import { FilmDownloadProgressComponent } from './film-download-progress';

@NgModule({
    declarations: [
        FilmDetailsWindowComponent,
        DownloadButtonComponent,
        FilmDownloadProgressComponent
    ],
    imports: [
        SharedModule
    ]
})
export class FilmDetailsWindowModule {}
