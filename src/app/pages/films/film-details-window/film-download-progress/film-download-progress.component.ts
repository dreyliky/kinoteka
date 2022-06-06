import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DownloadingFilmsSocketService, Film } from '@features/film';
import { merge, Observable, Subject } from 'rxjs';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-film-download-progress',
    templateUrl: './film-download-progress.component.html',
    styleUrls: ['./film-download-progress.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmDownloadProgressComponent implements OnInit, OnDestroy {
    @Input()
    public film!: Film;

    @Output()
    public readonly downloadEnd = new EventEmitter();

    public progress$!: Observable<number>;

    private viewDestroyed$ = new Subject<boolean>();

    constructor(
        private readonly downloadingFilmsSocketService: DownloadingFilmsSocketService
    ) {}

    public ngOnInit(): void {
        this.initProgressObservable();
        this.initEndEventsObserver();
    }

    public ngOnDestroy(): void {
        this.viewDestroyed$.next(true);
        this.viewDestroyed$.complete();
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
