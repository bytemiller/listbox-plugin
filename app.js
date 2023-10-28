import { Listbox } from "./src/listbox.js";

function callback(data) {
    console.log('Data', data);
}

const listbox = new Listbox('.container', [
    {name: 'c', id: '1'},
    {name: 'b', id: '2'},
    {name: 'a', id: '3'},
], {
    onSelectCallback: callback,
    theme: 'dark'
});

listbox.show();