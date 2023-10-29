import './styles.css';
import { getDuplicatesCount } from './utils';

export class Listbox {    
    #currentSelectedIdx = -1;
    
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
        
        if (!this.theme) this.theme = 'light';

        this.styles = {};
    }

    // public
    
    // show listbox on the screen.
    show() {
        this.styles = this.#getStyles();
        
        this.listbox = this.#element('div', ['listbox', this.styles.mainBGClass]);
        this.listbox.tabIndex = 0;
        this.root.appendChild(this.listbox);

        this.items.forEach(item => this.add(item));

        this.listbox.addEventListener('click', this.listboxSelectHandler);
        this.listbox.addEventListener('dblclick', this.listboxDoubleClickHandler);
        this.listbox.addEventListener('keyup', this.listboxSwitchItemByArrow);
        this.listbox.addEventListener('keyup', this.keydownHandler);
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
        this.listbox.removeEventListener('keyup', this.keydownHandler);
        this.listbox.removeEventListener('keyup', this.listboxSwitchItemByArrow);
        this.listbox.remove();
    }

    /**
     * Select and return item data from listbox.
     *
     * @param {string} id - item id.
     * @return {object} - all data of selected item.
     */
    select(id) {
        const item = this.listbox.querySelector('#' + id);
        return (item) ? {name: item.innerHTML, id: item.id} : {};
    }

    /**
     * Add item to listbox
     *
     * @param {object} itemData - item name and item id.
     * @param {string} [filterType='iter'] - item position type in listbox.
     * @return {boolean} - function return true if item added success else return false if such item is exists.
     */
    add(data, filterType = 'iter') {
        if (getDuplicatesCount(this.items, data) >= 2) return false;
        
        const item = this.#element('div', ['listbox__item', this.styles.itemHoverBG], data.id, data.name);
        
        if (filterType === 'iter')
            this.listbox.appendChild(item);
        
        else if (filterType === 'afterbegin')
            this.listbox.insertAdjacentElement('afterbegin', item);

        return true;
    }

    /**
     * Remove item from listbox.
     *
     * @param {string} id - item id.
     * @return {boolean} - function return true if item removed success else return false if such item isn't exists.
     */
    remove(id) {
        const item = this.listbox.querySelector('#' + id);
        
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

    // sort listbox items by alphabet
    filter() {
        let itemsNames = [];
        let sortedItems = [];

        this.items.forEach(item => { itemsNames.push(item.name); });
        itemsNames.sort().forEach(item => {
            sortedItems.push(this.items.find(el => el.name === item));
        });

        this.items = sortedItems;
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

            let currentItems = this.getAllItems();
            const item = this.select(event.target.id);
            this.#currentSelectedIdx = currentItems.findIndex(el => el.id === item.id);

            this.#setSelectColor(event.target);            
        }
    };

    listboxDoubleClickHandler = (event) => {
        if (event.target.classList.contains('listbox__item')) {
            const id = event.target.id;
            this.#selectedItemProcessing(id);
        }
    };

    listboxSwitchItemByArrow = (event) => {
        const items = this.getAllItems();

        if (event.key === 'ArrowUp') {
            this.#currentSelectedIdx--;

            if (this.#currentSelectedIdx < 0) this.#currentSelectedIdx = items.length - 1;
            
            this.#unselectSelectedItems();
            this.#setSelectColor(this.listbox.querySelector('#' + items[this.#currentSelectedIdx].id));

        } else if (event.key === 'ArrowDown') {
            this.#currentSelectedIdx++;

            if (this.#currentSelectedIdx >= items.length) this.#currentSelectedIdx = 0;
            
            this.#unselectSelectedItems();
            this.#setSelectColor(this.listbox.querySelector('#' + items[this.#currentSelectedIdx].id));
        }
    }

    keydownHandler = (event) => {
        if (event.key === 'Escape') { 
            this.#unselectSelectedItems();
            this.#currentSelectedIdx = -1;

        } else if (event.key === 'Enter') {
            if (this.#currentSelectedIdx < 0) return;
            const items = this.getAllItems();
            this.#selectedItemProcessing(items[this.#currentSelectedIdx].id);
        }
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

    #getStyles() {
        return {
            mainBGClass: (this.theme === 'light') ? 'listbox__light' : 'listbox__dark',
            itemHoverBG: (this.theme === 'light') ? 'listbox__item-hover-light' : 'listbox__item-hover-dark'
        };
    }

    #setSelectColor(target) {
        target.classList.add('listbox__item-selected');
        target.classList.remove(this.styles.itemHoverBG);
    }

    #selectedItemProcessing(id) {
        if (this.options.onSelectCallback)
            return this.options.onSelectCallback(this.select(id));
        console.log(`Item with ID: ${id} selected`, this.select(id));
    }
}