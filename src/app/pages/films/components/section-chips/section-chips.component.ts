import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DownloadingFilmsCountSocketService } from '@features/film';
import { map, Observable } from 'rxjs';
import { FilmsRoutingEnum } from '../../enums';

@Component({
    selector: 'app-section-chips',
    templateUrl: './section-chips.component.html',
    styleUrls: ['./section-chips.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionChipsComponent implements OnInit {
    public readonly filmsRoutingEnum = FilmsRoutingEnum;

    public filmsCount$!: Observable<number>;
    public isDownloadingFilmsCountBadgeHidden$!: Observable<boolean>;

    constructor(
        private readonly downloadingFilmsCountSocketService: DownloadingFilmsCountSocketService
    ) {}

    public ngOnInit(): void {
        this.filmsCount$ = this.downloadingFilmsCountSocketService.data$;

        this.initDownloadingFilmsCountBadgeVisibleObservable();
    }

    private initDownloadingFilmsCountBadgeVisibleObservable(): void {
        this.isDownloadingFilmsCountBadgeHidden$ = this.downloadingFilmsCountSocketService.data$
            .pipe(
                map((count) => (count === 0))
            );
    }
}
