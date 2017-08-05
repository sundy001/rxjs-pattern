import './sample2.html';
import { Observable } from 'rxjs/Rx';

const nameInputEl = document.getElementById('nameInput');

const nameInputKeypress$ = Observable
    .fromEvent(nameInputEl, 'keyup')
    .map((event: KeyboardEvent) => (event.target as HTMLInputElement).value);

const namesRequest$ = Observable
    .interval(2000)
    .take(1)
    .map(() => ({
        names: [
            'Betty',
            'David',
            'Joe',
            'Ray',
            'Roy',
            'Peter',
            'Carrie',
            'Josh',
            'Ann',
            'Jason',
            'Petr',
            'Victor',
            'Ari',
            'Annie',
            'Tommy',
            'Mick',
            'John',
            'Rayn',
            'Cammy',
        ]
    }));

const namesData = Observable.of('start')
    .flatMap(() => namesRequest$);

const suggestion$ = nameInputKeypress$
    .combineLatest(namesData, (input: string, { names }: { names: string[] }) => 
        Observable
            .from(names)
            .filter((name) => name.toLowerCase().indexOf(input.toLowerCase()) !== -1)
            .take(5)
            .toArray()
    )
    .concatAll()
    .startWith(null);

suggestion$.subscribe(
    (data) => {
        console.log(data);
    },
    (error) => {
        console.log(error);
    },
    () => {
        console.log('complete');
    }
);
