import { Listbox } from "./src/listbox.js";

function callback(data) {
    console.log('Data', data);
}

const listbox = new Listbox('.container', [
    {name: 'test1', id: 1},
    {name: 'test2', id: 2},
    {name: 'test3', id: 3}
], {
    onSelectCallback: callback,
    theme: 'light'
});

listbox.show();