import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Video } from '../../interfaces';

@Component({
    selector: 'video-card',
    templateUrl: './video-card.component.html',
    styleUrls: ['./video-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoCardComponent {
    @Input()
    public data!: Video;
}
