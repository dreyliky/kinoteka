import { Injectable } from '@angular/core';
import { BaseState } from '@core/states';

@Injectable()
export class SearchStringState extends BaseState<string> {}
