import './sample3.html';
import { Observable, Observer } from 'rxjs/Rx';

const actionBtnEl = document.getElementById('actionBtn');

// Cold observables
// do not do anything, before observer subscribe it. Cold => Lazy
// every subscription will create new producer, on the other world we call it unicast
const nameInputKeypress$:Observable<string> = Observable
    .create((observer: Observer<MouseEvent>) => {
        console.log('create');
        const eventListener = (event: MouseEvent) => {
            observer.next(event);
        };

        actionBtnEl.addEventListener('click', eventListener);

        return () => {
            actionBtnEl.removeEventListener('click', eventListener);
        };
    });

const test$ = nameInputKeypress$ 
    .delay(1000)
    .switchMap(() => {
        console.log('switchMap');

        return Observable.interval(1000).take(1);
    })
    .map(() => 'hello world');

test$.subscribe((value) => {
    console.log('yo ' + value);
});

setTimeout(() => {
    test$.subscribe((value) => {
        console.log('hi ' + value);
    });
}, 3000);

