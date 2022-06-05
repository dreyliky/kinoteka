import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AppRouteEnum } from '@enums/app-route.enum';
import { DownloadingFilmsCountSocketService } from '@services/downloading-films-count-socket.service';
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

    public filmsCount$!: Observable<number>;
    public isDownloadingFilmsCountBadgeVisible$!: Observable<boolean>;

    constructor(
        private readonly downloadingFilmsCountSocketService: DownloadingFilmsCountSocketService
    ) {}

    public ngOnInit(): void {
        this.filmsCount$ = this.downloadingFilmsCountSocketService.data$;

        this.initDownloadingFilmsCountBadgeVisibleObservable();
    }

    private initDownloadingFilmsCountBadgeVisibleObservable(): void {
        this.isDownloadingFilmsCountBadgeVisible$ = this.downloadingFilmsCountSocketService.data$
            .pipe(
                map((count) => (count >= 1))
            );
    }
}
