import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DestroyService } from '@core/services';
import { BookmarkedFilmsService } from '@features/film';
import { Observable, takeUntil } from 'rxjs';

@Component({
    selector: 'app-films',
    templateUrl: './films.component.html',
    styleUrls: ['./films.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService
    ]
})
export class FilmsComponent implements OnInit {
    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<boolean>,
        private readonly bookmarkedFilmsService: BookmarkedFilmsService
    ) {}

    public ngOnInit(): void {
        this.updateBookmarkedFilmsDictionaryIfAbsent();
    }

    private updateBookmarkedFilmsDictionaryIfAbsent(): void {
        this.bookmarkedFilmsService.updateDictionaryIfAbsent()
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }
}
