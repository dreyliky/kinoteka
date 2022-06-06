import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BlobService {
    public toBase64(blob: Blob): Observable<string> {
        return new Observable((subscriber) => {
            const reader = new FileReader();

            reader.readAsDataURL(blob); 
            reader.onloadend = () => {
                subscriber.next(reader.result as string);
                subscriber.complete();
            }
        });
    }
}
