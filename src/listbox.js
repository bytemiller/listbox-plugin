import { css } from './utils';
import './styles.css';

export class Listbox {
    /**
     * A listbox constructor.
     *
     * @param {string} rootSelector - class of the element in which the widget will be.
     * @param {array} items - listbox items, example: [{name: 'item1' --> item name., id: '1' --> item id.}, ...].
     * @param {object} options - listbox options
     */
    constructor(rootSelector, items = [], options = {}) {
        this.root = document.querySelector(rootSelector);
        this.items = items;
        this.options = options;
        this.theme = options.theme;
        
        this.styles = {};
    }

    // public
    
    // show listbox on the screen.
    show() {
        this.styles = this.#updateStyles();
        
        this.listbox = this.#element('div', ['listbox', this.styles.mainBGClass]);
        this.root.appendChild(this.listbox);

        this.items.forEach(item => this.add(item));

        this.listbox.addEventListener('click', this.listboxSelectHandler);
        this.listbox.addEventListener('dblclick', this.listboxDoubleClickHandler);
        window.addEventListener('keydown', this.unselectByESCHandler);
    }

    // restart listbox.
    restart() {
        this.destroy();
        this.show();
    }

    // destroy listbox from DOM.
    destroy() {
        this.listbox.removeEventListener('click', this.listboxSelectHandler);
        this.listbox.removeEventListener('dblclick', this.listboxDoubleClickHandler);
        window.removeEventListener('keydown', this.unselectByESCHandler);
        this.listbox.remove();
    }

    /**
     * Select and return item data from listbox.
     *
     * @param {string} id - item id.
     * @return {object} - all data of selected item.
     */
    select(id) {
        const item = document.getElementById(id);
        return (item) ? {name: item.innerHTML, id: item.id} : {};
    }

    /**
     * Add item to listbox
     *
     * @param {object} itemData - item name and item id.
     * @return {boolean} - function return true if item added success else return false if such item is exists.
     */
    add(data) {
        const item = this.#element('div', ['listbox__item', this.styles.itemHoverBG], data.id, data.name);
        this.listbox.appendChild(item);
    }

    /**
     * Add item to listbox.
     *
     * @param {string} id - item id.
     * @return {boolean} - function return true if item removed success else return false if such item isn't exists.
     */
    remove(id) {
        const item = document.getElementById(id);
        
        if (item) {
            item.remove();
            return true;
        }
        return false;
    }
 
    /**
     * Change listbox theme.
     *
     * @param {string} theme - theme name. Light or dark.
     *
     */
    changeTheme(theme) {
        this.theme = theme;
        this.restart();
    }

    // functions helpers

    /**
     * Get all items from listbox.
     *
     * @return {array} - all items.
     */
    getAllItems() {
        let items = []; 
        this.listbox.querySelectorAll('.listbox__item').forEach(item => {
            items.push({name: item.innerHTML, id: item.id});
        });
        return items;
    }

    // handlers

    listboxSelectHandler = (event) => {
        if (event.target.classList.contains('listbox__item')) {
            this.#unselectSelectedItems();
            
            event.target.classList.add('listbox__item-selected');
            event.target.classList.remove(this.styles.itemHoverBG);
        }
    };

    listboxDoubleClickHandler = (event) => {
        if (event.target.classList.contains('listbox__item')) {
            const id = event.target.id;
            
            if (this.options.onSelectCallback)
                return this.options.onSelectCallback(this.select(id));
            
            console.log(this.select(id));
        }
    };

    unselectByESCHandler = (event) => {
        if (event.keyCode === 27) this.#unselectSelectedItems();
    }

    // private methods

    #element(tag, classes = [], id = '', html = '') {
        const element = document.createElement(tag);
        element.classList.add(...classes);
        
        if (id) element.id = id;
        if (html) element.innerHTML = html; 
        return element;
    }

    #unselectSelectedItems() {
        const items = this.listbox.querySelectorAll('.listbox__item');
        items.forEach(item => {
            item.classList.remove('listbox__item-selected');
            item.classList.add(this.styles.itemHoverBG);
        });
    }

    #updateStyles() {
        return {
            mainBGClass: (this.theme === 'light') ? 'listbox__light' : 'listbox__dark',
            itemHoverBG: (this.theme === 'light') ? 'listbox__item-hover-light' : 'listbox__item-hover-dark'
        };
    }
}