import { Observable } from 'rxjs/Rx';

const itmeListEl = document.querySelector('#todoItems');
const addBtnEl = document.querySelector('#addBtn');
const todoInputEl = document.querySelector('#todoInput') as HTMLInputElement;

const removeItem$ = Observable.fromEvent(itmeListEl, 'click')
    .map((event: MouseEvent) => event.target as HTMLElement)
    .filter((el: HTMLElement) => {
        return el.classList.contains('badge-remove-btn');
    })
    .map((el: HTMLElement) => el.closest('.badge-list-item'))
;

const todoInputEnterPress$ = Observable.fromEvent(todoInputEl, 'keypress')
    .filter((event: KeyboardEvent) => event.which === 13);

const addBtnClick$ = Observable.fromEvent(addBtnEl, 'click');

const addItem$ = todoInputEnterPress$.merge(addBtnClick$)
    .map(() => todoInputEl.value);

const clearIntput$ = addItem$;

addItem$.subscribe((value) => {
    const closeBtnEl = document.createElement('button');
    closeBtnEl.textContent = 'X';
    closeBtnEl.classList.add('badge-remove-btn', 'list-item__remove-btn');

    const checkboxEl = document.createElement('input');
    checkboxEl.setAttribute('type', 'checkbox');
    checkboxEl.classList.add('badge-checkbox');

    const pEl = document.createElement('li');
    pEl.appendChild(checkboxEl);
    pEl.appendChild(document.createTextNode(value));
    pEl.classList.add('badge-list-item', 'list-item');
    pEl.appendChild(closeBtnEl);

    itmeListEl.appendChild(pEl);
});

clearIntput$.subscribe(() => {
    todoInputEl.value = '';
});

removeItem$.subscribe((el: HTMLElement) => {
    el.remove();
});
