import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DownloadingFilmsCountSocketService } from '@services/downloading-films-count-socket.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
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
