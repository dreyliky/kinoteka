import { Injectable } from '@angular/core';
import { Video } from '@features/video';
import { ObjectState } from 'ngx-base-state';

@Injectable()
export class SearchVideoState extends ObjectState<Video> {}
