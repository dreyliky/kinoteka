import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContentZoneService } from '@core/services';
import { Film, FilmsFiltersService, FilmsResponse, FilmsService } from '@features/film';
import { HeaderService } from '@layouts/components';
import { merge, Observable, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { FilmDetailsWindowComponent } from './film-details-window';
import { HeaderPortalContentComponent } from './header-portal-content';

@Component({
    selector: 'app-films',
    templateUrl: './films.component.html',
    styleUrls: ['./films.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmsComponent implements OnInit, OnDestroy {
    public filmsResponse$!: Observable<FilmsResponse | null>;

    private get viewDestroyedOrFiltersChanged$(): Observable<unknown> {
        return merge(
            this.viewDestroyed$,
            this.filmsFiltersService.data$
                .pipe(skip(1))
        )
    }

    private readonly viewDestroyed$ = new Subject<boolean>();

    constructor(
        private readonly contentZoneService: ContentZoneService,
        private readonly headerService: HeaderService,
        private readonly dialogService: MatDialog,
        private readonly filmsService: FilmsService,
        private readonly filmsFiltersService: FilmsFiltersService
    ) {}

    public ngOnInit(): void {
        this.filmsResponse$ = this.filmsService.filmsResponse$;

        this.headerService.setPortalComponent(HeaderPortalContentComponent);
        this.updateFilmsIfAbsent();
        this.initFilmsFiltersObserver();
    }

    public ngOnDestroy(): void {
        this.headerService.clearPortalComponent();
        this.viewDestroyed$.next(true);
        this.viewDestroyed$.complete();
    }

    public onFilmClick(data: Film): void {
        this.dialogService.open(FilmDetailsWindowComponent, {
            width: '100%',
            minWidth: '100%',
            height: '100%',
            disableClose: true,
            panelClass: 'film-details-pane',
            autoFocus: true,
            data
        })
            .afterClosed()
            .subscribe();
    }

    private updateFilms(): void {
        this.filmsService.updateAllByFilters()
            .pipe(takeUntil(this.viewDestroyedOrFiltersChanged$))
            .subscribe(() => this.contentZoneService.scrollTop());
    }

    private updateFilmsIfAbsent(): void {
        this.filmsService.updateAllByFiltersIfAbsent()
            .subscribe();
    }

    private initFilmsFiltersObserver(): void {
        this.filmsFiltersService.data$
            .pipe(
                skip(1),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe(() => this.updateFilms());
    }
}
