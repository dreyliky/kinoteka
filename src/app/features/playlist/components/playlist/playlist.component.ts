import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Playlist } from '../../interfaces';

@Component({
    selector: 'playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistComponent {
    @Input()
    public data!: Playlist;
}
