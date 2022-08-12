import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
    selector: 'app-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
    @Input()
    public color: ThemePalette;

    @Input()
    public sizeInPx: number = 24;

    @HostBinding('style.--icon-size')
    public get sizeCssVariable(): string {
        return `${this.sizeInPx}px`;
    }
}
