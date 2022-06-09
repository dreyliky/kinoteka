import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FavoriteFilmsService, Film } from '@features/film';

@Component({
    selector: 'app-favorite-button',
    templateUrl: './favorite-button.component.html',
    styleUrls: ['./favorite-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteButtonComponent implements OnInit {
    @Input()
    public film!: Film;

    public isFilmFavorite: boolean = false;

    constructor(
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
            .subscribe();
    }

    private removeFromFavorites(): void {
        this.favoriteFilmsService.remove(this.film.kinopoiskId)
            .subscribe();
    }

    private initIsFilmFavorite(): void {
        this.favoriteFilmsService.getState(this.film.kinopoiskId)
            .subscribe((state) => {
                this.isFilmFavorite = state;

                this.changeDetector.detectChanges();
            })
    }
}
