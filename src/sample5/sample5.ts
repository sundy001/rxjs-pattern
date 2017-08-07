import './sample5.html';
import { Observable, Observer } from 'rxjs/Rx';

const blackBtnEl = document.getElementById('blackBtn');
const redBtnEl = document.getElementById('redBtn');


const blackBtnClick$ = Observable.create((observer: Observer<MouseEvent>) => {
    console.log('attach blackBtnEl click event');
    const eventHandler = (event: MouseEvent) => {
        observer.next(event);
    };
    blackBtnEl.addEventListener('click', eventHandler);

    return () => {
        blackBtnEl.removeEventListener('click', eventHandler);
    };
});

const redBtnClick$ = Observable.create((observer: Observer<MouseEvent>) => {
    console.log('attach redBtnEl click event');
    const eventHandler = (event: MouseEvent) => {
        observer.next(event);
    };
    redBtnEl.addEventListener('click', eventHandler);

    return () => {
        redBtnEl.removeEventListener('click', eventHandler);
    };
});
