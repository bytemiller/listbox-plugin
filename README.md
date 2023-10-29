## About the Project

This is a web plugin that allows you to create a listbox with a large number of useful functions that greatly simplify development.

Project has two themes:


Light theme
![](https://github.com/bytemiller/listbox-plugin/blob/master/images/light-simple.png?raw=true)

Dark theme
![](https://github.com/bytemiller/listbox-plugin/blob/master/images/dark-simple.png?raw=true)

## Getting Started

This example shows how to run a plugin on your site.

**Installation**

    git clone https://github.com/bytemiller/listbox-plugin.git

**Usage**

Main javascript file:

    import { Listbox } from './listbox-plugin/listbox.js' // import Listbox class.
	
	function selectionCallback(item) {
		console.log('Item Data', item);
	}	 // when user select item, function print a selected item data.

	const listbox = new Listbox('.container', [
		{name: 'item 1', id: 'id1'},
		{name: 'item 2', id: 'id2'},
		{name: 'item 3', id: 'id3'},
	], {
		onSelectCallback: selectionCallback,
		theme: 'light'
	});

	listbox.show(); // show a listbox.

*See the documentation for more details*

Created by Artem Miller.


