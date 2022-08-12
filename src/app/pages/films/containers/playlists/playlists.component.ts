import { ChangeDetectionStrategy, Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { DestroyService } from '@core/services';
import { FilmPlaylistCategoriesService } from '@features/film';
import { ContentZoneService, HeaderService } from '@layouts';
import { Observable, takeUntil, tap } from 'rxjs';
import { HeaderPortalContentComponent } from './components';
import { SelectedPlaylistCategory } from './states';

@Component({
    selector: 'app-playlists-page',
    templateUrl: './playlists.component.html',
    styleUrls: ['./playlists.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService
    ]
})
export class PlaylistsPageComponent implements OnInit, OnDestroy {
    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<boolean>,
        private readonly headerService: HeaderService,
        private readonly contentZoneService: ContentZoneService,
        private readonly selectedPlaylistCategory: SelectedPlaylistCategory,
        private readonly filmPlaylistCategoriesService: FilmPlaylistCategoriesService,
        private readonly injector: Injector
    ) {}

    public ngOnInit(): void {
        this.headerService.setPortalComponent(HeaderPortalContentComponent, this.injector);
        this.updateFilmPlaylistCategoriesIfAbsent();
        this.initPlaylistCategorySelectionObserver();
    }

    public ngOnDestroy(): void {
        this.headerService.clearPortalComponent();
    }

    private updateFilmPlaylistCategoriesIfAbsent(): void {
        this.filmPlaylistCategoriesService.updateAllIfAbsent()
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    private initPlaylistCategorySelectionObserver(): void {
        this.selectedPlaylistCategory.data$
            .pipe(
                tap(() => this.contentZoneService.scrollTop()),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe();
    }
}
