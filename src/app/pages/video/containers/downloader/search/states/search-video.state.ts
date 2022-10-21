import { Injectable } from '@angular/core';
import { Video } from '@features/video';
import { NgxState, ObjectState } from 'ngx-base-state';

@NgxState()
@Injectable()
export class SearchVideoState extends ObjectState<Video> {}
