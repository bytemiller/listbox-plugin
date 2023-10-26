import { Listbox } from "./src/listbox.js";

const listbox = new Listbox('.container', [
    {name: 'test1', id: 1},
    {name: 'test2', id: 2},
    {name: 'test3', id: 3}
]);

listbox.show();