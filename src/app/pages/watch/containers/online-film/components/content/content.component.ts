import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DetailedFilmInfo } from '@features/film';
import { Observable } from 'rxjs';
import { SectionEnum } from '../../enums';
import { SectionState } from '../../states';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit {
    @Input()
    public film!: DetailedFilmInfo;

    public openedSection$!: Observable<SectionEnum | null>;

    public readonly sectionEnum = SectionEnum;

    constructor(
        private readonly sectionState: SectionState
    ) {}

    public ngOnInit(): void {
        this.openedSection$ = this.sectionState.data$;
    }

    public openSection(section: SectionEnum): void {
        this.sectionState.set(section);
    }
}
