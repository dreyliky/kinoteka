import { Injectable } from '@angular/core';
import { PrimitiveState } from 'ngx-base-state';
import { SectionEnum } from '../enums';

@Injectable()
export class SectionState extends PrimitiveState<SectionEnum> {
    constructor() {
        super(SectionEnum.Info);
    }
}
