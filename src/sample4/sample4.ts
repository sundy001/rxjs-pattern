import './sample4.html';
import { Observable, Observer } from 'rxjs/Rx';

// transform a stream to a data stream
// use function to encapsulate the transform logic
const toSkipData$ = <T>(event$: Observable<any>, dataStreamFactory: () => Observable<T>): Observable<T> => {
    // skip pattern
    let isCompleted = true;

    return event$
        // if data stream is not complete, omit the emit
        .filter(() => isCompleted)
        .flatMap(() => {
            console.log('dataStreamFactory');
            // mark the flag, to prevent other emit come
            isCompleted = false;

            // create a fresh stream in every flat map
            return dataStreamFactory();
        })
        .do(() => {
            // after data stream is finish, reset the flag
            isCompleted = true;
        });
    ;
};

const actionBtnEl = document.getElementById('actionBtn');

const actionBtnClick$ = Observable.fromEvent(actionBtnEl, 'click');
// in actual use case, the factory should return fetch stream
const dataStreamFactory = () => Observable.of([1, 2, 3, 4, 5]).delay(2000);
const skipData$ = toSkipData$(actionBtnClick$, dataStreamFactory);

skipData$.subscribe((value) => {
    console.log('yo ' + value);
});
