import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContentZoneService } from '@services';
import { DownloadingFilmsCountSocketService } from '@services/downloading-films-count-socket.service';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    @Output()
    public menuButtonClick = new EventEmitter<Event>();

    public filmsCount$!: Observable<number>;
    public isDownloadingFilmsCountBadgeHidden$!: Observable<boolean>;

    public isArrowUpIconVisible$ = this.contentZoneService.scroll$
        .pipe(
            debounceTime(100),
            map(({ target }) => ((target as HTMLElement).scrollTop > 100))
        );

    constructor(
        private readonly contentZoneService: ContentZoneService,
        private readonly downloadingFilmsCountSocketService: DownloadingFilmsCountSocketService
    ) {}

    public ngOnInit(): void {
        this.filmsCount$ = this.downloadingFilmsCountSocketService.data$;

        this.initDownloadingFilmsCountBadgeVisibleObservable();
    }

    public onAppNameClick(): void {
        this.contentZoneService.scrollTop();
    }

    private initDownloadingFilmsCountBadgeVisibleObservable(): void {
        this.isDownloadingFilmsCountBadgeHidden$ = this.downloadingFilmsCountSocketService.data$
            .pipe(
                map((count) => (count === 0))
            );
    }
}
