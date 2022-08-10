import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DestroyService } from '@core/services';
import { FilmPlaylistCategoriesService } from '@features/film';
import { PlaylistCategory } from '@features/playlist';
import { combineLatest, filter, Observable, take, takeUntil, tap } from 'rxjs';
import { SelectedPlaylistCategory } from '../../states';

@Component({
    selector: 'app-header-portal-content',
    templateUrl: './header-portal-content.component.html',
    styleUrls: ['./header-portal-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService
    ]
})
export class HeaderPortalContentComponent implements OnInit {
    public categories$!: Observable<PlaylistCategory[] | null>;
    public selectedCategory$!: Observable<number | null>;

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<boolean>,
        private readonly selectedPlaylistCategory: SelectedPlaylistCategory,
        private readonly filmPlaylistCategoriesService: FilmPlaylistCategoriesService
    ) {}

    public ngOnInit(): void {
        this.categories$ = this.filmPlaylistCategoriesService.data$;
        this.selectedCategory$ = this.selectedPlaylistCategory.data$;

        this.initFirstCategorySelectionWhenDataReady();
    }

    public onCategoryClick(category: PlaylistCategory): void {
        this.selectedPlaylistCategory.set(category.id);
    }

    private initFirstCategorySelectionWhenDataReady(): void {
        combineLatest([
            this.categories$,
            this.selectedCategory$
        ])
            .pipe(
                filter(([categories, selectedCategory]) => (!!categories && !selectedCategory)),
                tap(([categories]) => this.selectedPlaylistCategory.set(categories![0].id)),
                take(1),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe();
    }
}
