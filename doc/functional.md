## Functional

**Function 'add'**
	

    listbox.add({name: 'item4', id: 'my_id123'}, 'afterbegin');
		// arguments: (item_data, position);
		// function add item to listbox.
		// position: afterbegin, iter.
		// use afterbegin if you want the element to be added in first place.
		// use iter if you want the element to be added in last place.

*Output*
		

    true - if item added successfully.
    false - if such item is exists.
		    
    

**Function 'remove'**
	

    const result = listbox.remove('my_id123');
    console.log(result);
    // function remove item from listbox.
    // arguments: id - id mustn't be a integer in string.
		
*Output:*

    true -if item remove successfully.
    false - if item not found.

**Function 'restart'**
	

    listbox.restart();
    // restart a listbox.

**Function 'destroy'**
	

    listbox.destroy();
    // destroy listbox.

**Function 'select'**

    listbox.select('my_id123');
    // arguments: id - item id.
    // function return a item data.

*Output:*

    {name: 'item4', id: 'my_id123'} - if all successfully.
    {} - if such item not found.

**Function 'changeTheme'**

    listbox.changeTheme('dark');
    // arguments: theme
    // function change listbox theme
    // allowed themes: dark, light

**Function 'filter'**

    listbox.filter();
    // function sort items in listbox.

**Function 'getAllItems'**

    const items = listbox.getAllItems();
    // function return a array with items.

*Output:*

    [{name: 'item 4', id: 'my_id123'}];

