import { Injectable } from '@angular/core';
import { PlaylistCategory } from '@features/playlist';
import { Observable, tap } from 'rxjs';
import { FilmPlaylistCategoriesApi } from '../api';
import { PlaylistCategoriesState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class FilmPlaylistCategoriesService {
    public readonly data$ = this.categoriesState.data$;

    public get data(): PlaylistCategory[] | null {
        return this.categoriesState.data;
    }

    constructor(
        private readonly filmPlaylistCategoriesApi: FilmPlaylistCategoriesApi,
        private readonly categoriesState: PlaylistCategoriesState
    ) {}

    public updateAll(): Observable<PlaylistCategory[]> {
        return this.filmPlaylistCategoriesApi.getAll()
            .pipe(
                tap((data) => this.categoriesState.set(data))
            );
    }

    public updateAllIfAbsent(): Observable<PlaylistCategory[]> {
        if (!this.categoriesState.data) {
            return this.updateAll();
        }

        return (this.data$ as Observable<PlaylistCategory[]>);
    }
}
