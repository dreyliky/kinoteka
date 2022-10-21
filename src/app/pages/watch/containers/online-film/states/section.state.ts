import { Injectable } from '@angular/core';
import { NgxState, PrimitiveState } from 'ngx-base-state';
import { SectionEnum } from '../enums';

@NgxState()
@Injectable()
export class SectionState extends PrimitiveState<SectionEnum> {
    constructor() {
        super(SectionEnum.Info);
    }
}
