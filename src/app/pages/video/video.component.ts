import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DestroyService } from '@core/services';
import { BookmarkedVideosService } from '@features/video';
import { Observable, takeUntil } from 'rxjs';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService
    ]
})
export class VideoComponent implements OnInit {
    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<boolean>,
        private readonly bookmarkedVideosService: BookmarkedVideosService
    ) {}

    public ngOnInit(): void {
        this.updateBookmarkedVideosDictionaryIfAbsent();
    }

    private updateBookmarkedVideosDictionaryIfAbsent(): void {
        this.bookmarkedVideosService.updateDictionaryIfAbsent()
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }
}
