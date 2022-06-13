import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DownloadedFilm } from '../../interfaces';
import { DownloadedFilmPreviewLoader } from './downloaded-film-preview-loader.interface';
import { DOWNLOADED_FILM_PREVIEW_LOADER } from './downloaded-film-preview-loader.token';

@Component({
    selector: 'downloaded-film-card',
    templateUrl: './downloaded-film-card.component.html',
    styleUrls: ['./downloaded-film-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadedFilmCardComponent implements OnInit {
    @Input()
    public data!: DownloadedFilm;

    public previewBgCss$!: Observable<string>;

    constructor(
        @Inject(DOWNLOADED_FILM_PREVIEW_LOADER)
        private readonly previewLoader: DownloadedFilmPreviewLoader
    ) {}

    public ngOnInit(): void {
        this.initPreviewBgCssObservable();
    }

    private initPreviewBgCssObservable(): void {
        this.previewBgCss$ = this.previewLoader.getPreview(this.data.kinopoiskId)
            .pipe(map((preview) => `url(${preview})`))
    }
}
