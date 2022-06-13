import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AppRouteEnum } from '@core/enums';
import { DownloadingMediaCountSocketService } from '@features/media';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
    @Output()
    public optionClick = new EventEmitter<Event>();

    public readonly appRouteEnum = AppRouteEnum;

    public mediaCount$!: Observable<number>;
    public isDownloadingMediaCountBadgeVisible$!: Observable<boolean>;

    constructor(
        private readonly downloadingMediaCountSocketService: DownloadingMediaCountSocketService
    ) {}

    public ngOnInit(): void {
        this.mediaCount$ = this.downloadingMediaCountSocketService.data$;

        this.initDownloadingFilmsCountBadgeVisibleObservable();
    }

    private initDownloadingFilmsCountBadgeVisibleObservable(): void {
        this.isDownloadingMediaCountBadgeVisible$ = this.downloadingMediaCountSocketService.data$
            .pipe(
                map((count) => (count >= 1))
            );
    }
}
