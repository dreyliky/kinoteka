import { Injectable } from '@angular/core';
import { NgxState, PrimitiveState } from 'ngx-base-state';

@NgxState()
@Injectable()
export class SearchStringState extends PrimitiveState<string> {}
