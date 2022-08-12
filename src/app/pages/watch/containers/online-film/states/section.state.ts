import { Injectable } from '@angular/core';
import { BaseState } from '@core/states';
import { SectionEnum } from '../enums';

@Injectable()
export class SectionState extends BaseState<SectionEnum> {
    constructor() {
        super(SectionEnum.Info);
    }
}
