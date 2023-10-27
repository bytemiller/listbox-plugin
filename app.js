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
    styles: {
        listboxBG: 'rgb(45, 45, 45)',
        listboxColor: '#fff',
        listboxItemHover: 'rgb(30, 30, 30)',
        listboxItemHoverColor: '#fff',
        listboxItemSelectedClass: 'my-custom-select'
    }
});

listbox.show();