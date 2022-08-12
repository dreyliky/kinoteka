import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { DestroyService } from '@core/services';
import { FavoriteFilmsService } from '@features/film';
import { Observable, takeUntil } from 'rxjs';
import { OpenedFilmState } from '../../states';

@Component({
    selector: 'app-favorite-button',
    templateUrl: './favorite-button.component.html',
    styleUrls: ['./favorite-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService
    ]
})
export class FavoriteButtonComponent implements OnInit {
    public isFilmFavorite: boolean = false;

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
        private readonly openedFilmState: OpenedFilmState,
        private readonly favoriteFilmsService: FavoriteFilmsService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initIsFilmFavorite();
    }

    public onToggleFavoriteButtonClick(): void {
        if (this.isFilmFavorite) {
            this.removeFromFavorites();
        } else {
            this.addToFavorites();
        }

        this.isFilmFavorite = !this.isFilmFavorite;
    }

    private addToFavorites(): void {
        this.favoriteFilmsService.add(this.openedFilmState.data!.kinopoiskId)
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    private removeFromFavorites(): void {
        this.favoriteFilmsService.remove(this.openedFilmState.data!.kinopoiskId)
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    private initIsFilmFavorite(): void {
        this.favoriteFilmsService.getState(this.openedFilmState.data!.kinopoiskId)
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((state) => {
                this.isFilmFavorite = state;

                this.changeDetector.detectChanges();
            })
    }
}
