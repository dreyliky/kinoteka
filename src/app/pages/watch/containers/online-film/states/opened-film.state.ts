import { Injectable } from '@angular/core';
import { Film } from '@features/film';
import { NgxState, ObjectState } from 'ngx-base-state';

@NgxState()
@Injectable()
export class OpenedFilmState extends ObjectState<Film> {}
