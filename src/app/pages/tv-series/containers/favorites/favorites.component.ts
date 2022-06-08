import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FavoriteFilmsService, Film } from '@features/film';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent implements OnInit {
    public films$!: Observable<Film[]>;

    constructor(
        private readonly favoriteFilmsService: FavoriteFilmsService
    ) {}

    public ngOnInit(): void {
        this.films$ = this.favoriteFilmsService.getAll();
    }
}
