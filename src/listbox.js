import './styles.css';

export class Listbox {
    /**
     * A listbox constructor.
     *
     * @param {string} rootSelector - class of the element in which the widget will be.
     * @param {array} items - listbox items, example: [{name: 'item1' --> item name., id: '1' --> item id.}, ...].
     * @param {string} theme - listbox theme, light or dark.
     */
    constructor(rootSelector, items = [], theme = 'light') {
        this.listbox = document.querySelector(rootSelector);
        this.items = items
        this.theme = theme
    }

    
    // show listbox on the screen.
    show() {

    }

    // hide listbox from screen.
    hide() {

    }

    /**
     * Select a listbox item.
     *
     * @param {any} id - item id.
     * @return {object} - all data of selected item.
     */
    select(id) {

    }

    /**
     * Add item to listbox
     *
     * @param {object} itemData - item name and item id.
     * @return {boolean} - function return true if item added success else return false if such item is exists.
     */
    add(itemData) {

    }

    /**
     * Add item to listbox
     *
     * @param {any} id - item id.
     * @return {boolean} - function return true if item removed success else return false if such item isn't exists.
     */
    remove(id) {

    }
}