import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { DestroyService } from '@core/services';
import { VideosService } from '@features/video';
import { BehaviorSubject, combineLatest, map, merge, Observable, skip, takeUntil } from 'rxjs';
import { SearchStringState, SearchVideoState } from './states';

@Component({
    selector: 'app-video-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService
    ]
})
export class SearchComponent implements OnInit {
    @ViewChild('input')
    private readonly inputRef!: ElementRef<HTMLInputElement>;

    public isLoading$ = new BehaviorSubject<boolean>(false);
    public searchString$!: Observable<string | null>;
    public isSearchButtonDisabled$!: Observable<boolean>;

    private get searchStringChangedOrViewDestroyed$(): Observable<unknown> {
        return merge(
            this.searchString$.pipe(skip(1)),
            this.viewDestroyed$
        )
    }

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
        private readonly videosService: VideosService,
        private readonly searchStringState: SearchStringState,
        private readonly searchVideoState: SearchVideoState
    ) {}

    public ngOnInit(): void {
        this.searchString$ = this.searchStringState.data$;

        this.initIsSearchButtonDisabledObservable();
    }

    public onInput(): void {
        this.searchStringState.set(this.inputRef.nativeElement.value);
        this.searchVideoState.clear();
    }

    public onDownloadButtonClick(): void {
        this.isLoading$.next(true);

        this.videosService.getInfo(this.searchStringState.data as string)
            .pipe(takeUntil(this.searchStringChangedOrViewDestroyed$))
            .subscribe((data) => {
                this.searchVideoState.set(data);
                this.isLoading$.next(false);
            });
    }

    public onClearButtonClick(): void {
        this.searchStringState.clear();
        this.searchVideoState.clear();
    }

    private initIsSearchButtonDisabledObservable(): void {
        this.isSearchButtonDisabled$ = combineLatest([
            this.searchString$,
            this.isLoading$,
            this.searchVideoState.data$
        ])
            .pipe(
                map(([searchString, isLoading, video]) => (!searchString || isLoading || !!video))
            );
    }
}
