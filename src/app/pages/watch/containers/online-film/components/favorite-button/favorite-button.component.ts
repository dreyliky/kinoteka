import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { DestroyService } from '@core/services';
import { FavoriteFilmsService, Film } from '@features/film';
import { Observable, takeUntil } from 'rxjs';

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
    @Input()
    public film!: Film;

    public isFilmFavorite: boolean = false;

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
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
        this.favoriteFilmsService.add(this.film.kinopoiskId)
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    private removeFromFavorites(): void {
        this.favoriteFilmsService.remove(this.film.kinopoiskId)
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    private initIsFilmFavorite(): void {
        this.favoriteFilmsService.getState(this.film.kinopoiskId)
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((state) => {
                this.isFilmFavorite = state;

                this.changeDetector.detectChanges();
            })
    }
}
