import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { DestroyService } from '@core/services';
import { DownloadingFilmsSocketService, Film } from '@features/film';
import { merge, Observable } from 'rxjs';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-film-download-progress',
    templateUrl: './film-download-progress.component.html',
    styleUrls: ['./film-download-progress.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService
    ]
})
export class FilmDownloadProgressComponent implements OnInit {
    @Input()
    public film!: Film;

    @Output()
    public readonly downloadEnd = new EventEmitter();

    public progress$!: Observable<number>;

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
        private readonly downloadingFilmsSocketService: DownloadingFilmsSocketService
    ) {}

    public ngOnInit(): void {
        this.initProgressObservable();
        this.initEndEventsObserver();
    }

    private initEndEventsObserver(): void {
        merge(
            this.downloadingFilmsSocketService.onFilmDownloadCancel$,
            this.downloadingFilmsSocketService.onFilmDownloadEnd$
        )
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => this.downloadEnd.emit());
    }

    private initProgressObservable(): void {
        this.progress$ = this.downloadingFilmsSocketService.progress$
            .pipe(
                filter(({ kinopoiskId }) => (this.film.kinopoiskId === kinopoiskId)),
                map(({ downloadProgress }) => downloadProgress),
                startWith(0),
                takeUntil(this.viewDestroyed$)
            );
    }
}
