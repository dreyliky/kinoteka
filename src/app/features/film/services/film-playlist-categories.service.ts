import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { PlaylistCategory } from '@features/playlist';
import { Observable, tap } from 'rxjs';
import { PlaylistCategoriesState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class FilmPlaylistCategoriesService {
    public readonly data$ = this.categoriesState.data$;
    public readonly data = this.categoriesState.data;

    constructor(
        private readonly apiService: ApiService,
        private readonly categoriesState: PlaylistCategoriesState
    ) {}

    public updateAll(): Observable<PlaylistCategory[]> {
        return this.apiService.get<PlaylistCategory[]>(`/film-playlist-categories`)
            .pipe(
                tap((data) => this.categoriesState.set(data))
            );
    }

    public updateAllIfAbsent(): Observable<PlaylistCategory[]> {
        if (!this.categoriesState.data) {
            return this.updateAll();
        }

        return this.data$ as Observable<PlaylistCategory[]>;
    }
}
