import { Injectable } from '@angular/core';
import { PrimitiveState } from 'ngx-base-state';

@Injectable()
export class SearchStringState extends PrimitiveState<string> {}
