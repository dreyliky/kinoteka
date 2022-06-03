import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Film } from '@interfaces';
import { DownloadingFilmsSocketService } from '@services';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-film-download-progress',
    templateUrl: './film-download-progress.component.html',
    styleUrls: ['./film-download-progress.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmDownloadProgressComponent implements OnInit {
    @Input()
    public film!: Film;

    public progress$!: Observable<number>;

    constructor(
        private readonly downloadingFilmsSocketService: DownloadingFilmsSocketService
    ) {}

    public ngOnInit(): void {
        this.initProgressObservable();
    }

    private initProgressObservable(): void {
        this.progress$ = this.downloadingFilmsSocketService.progress$
            .pipe(
                filter(({ kinopoiskId }) => (this.film.kinopoiskId === kinopoiskId)),
                map(({ downloadProgress }) => downloadProgress),
                startWith(0)
            );
    }
}
