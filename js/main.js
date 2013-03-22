// JavaScript Document
// Project 2
// Visual Framewoks @ Full Sail University
// Evan Combs
window.addEventListener("DOMContentLoaded", function(){	
	//gets the element by its ID tag
	function $(id)
	{
		var element = document.getElementById(id);
		return element;
	}
	
	var importanceValue;
	var saveData = $('submit');
	var clearData = $('clearData');
	var displayData = $('displayData');
	var categorySelect = ['Programming', 'Art', 'Sound', 'Design', 'UI'];
	
	//creates a selection form
	function createSelection()
	{
		var formTag = document.getElementsByTagName('form');
		var selectItem = $('select');
		var addSelect = document.createElement('select');
		
		addSelect.setAttribute('id', 'category');
		for(var i = 0; i < categorySelect.length; i++)
		{
			var addOption = document.createElement('option');
			var text = categorySelect[i];
			
			addOption.setAttribute('value', text);
			addOption.innerHTML = text;
			addSelect.appendChild(addOption);
		}
		selectItem.appendChild(addSelect);
	}
	createSelection();
	
	//hides and reveals different elements
	function toggleDisplay(input)
	{
		switch(input)
		{
			case "on":
				$('entryForm').style.display = 'none';
				$('clearData').style.display = 'inline';
				$('displayData').style.display = 'none';
				$('addNew').style.display = 'inline';
				break;
				
			case "off":
				$('entryForm').style.display = 'block';
				$('clearData').style.display = 'inline';
				$('displayData').style.display = 'inline';
				$('addNew').style.display = 'none';
				$('data').style.display = 'none';
				break;
				
			default:
				return false;
		}
	}
	
	//finds the radio that is checked
	function getImportanceRadio()
	{
		//creates array of radios
		var radios = document.forms[0].importance;	
		for(var i = 0; i < radios.length; i++)
		{
			//if radio button is checked assign its value
			if (radios[i].checked)
			{
				importanceValue = radios[i].value;
			}
		}
	}
	
	//saves the data to the local storage
	function saveToLocal(oldKey)
	{
		if(!oldKey)
		{
			//creates key value for local storage
			var key = Math.floor(Math.random() * 10000000000);
		}
		else
		{
			key = oldKey;
		}
		//gets form values, stores them in an object
		getImportanceRadio();	
		var data = {};
		data.category = ['Category', $('category').value];
		data.task = ['Task', $('task').value];
		data.importance = ['Importance', importanceValue];
		data.startDate = ['Start Date', $('startDate').value];
		data.endDate = ['End Date', $('endDate').value];
		data.hours = ['Hours', $('hours').value];
		data.description = ['Description', $('description').value];
		
		//saves to local storage, converts object to string
		localStorage.setItem(key, JSON.stringify(data));
		alert('Saved');
		window.location.reload();
	}
	
	//gets data from local storage, and displays it on the screen
	function getLocalData()
	{
		toggleDisplay("on");
		var addDiv = document.createElement('div');
		addDiv.setAttribute('id', 'data');
		if(localStorage.length === 0)
		{
			/*var addP = document.createElement('p');
			addDiv.appendChild(addP);
			var pText = 'There are no list items.';
			addP.innerHTML = pText;*/
			autoFill(); //change name
		}
		var addList = document.createElement('ul');
		addDiv.appendChild(addList);
		document.body.appendChild(addDiv);
		$('data').style.display = "block";
		for(var i = 0; i < localStorage.length; i++)
		{
			var addItem = document.createElement('li');
			var editDeleteLi = document.createElement('li');
			addList.appendChild(addItem);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//converts local storage string back into original object
			var object = JSON.parse(value);
			var addSubList = document.createElement('ol');
			addSubList.className = 'listItem';
			addItem.appendChild(addSubList);
			findImage(addSubList, object.category[1]);
			for(var j in object)
			{
				var addSubItem = document.createElement('li');
				addSubList.appendChild(addSubItem);
				var text = object[j][0]+': '+object[j][1];
				addSubItem.innerHTML = text;
				addSubItem.className = 'subItem';			
			}
			addSubList.appendChild(editDeleteLi);
			createEditDelete(localStorage.key(i), editDeleteLi);
		}
	}
	
	//finds the proper image for the category
	function findImage(addSubList, imageName)
	{
		var imageItem = document.createElement('li');
		addSubList.appendChild(imageItem);
		var addImage = document.createElement('img');
		var setSource = addImage.setAttribute('src', 'img/' + imageName + '.png');
		addImage.className = 'subItem';
		addImage.height = 50;
		addImage.width = 50;
		imageLi.appendChild(addImage);
	}
	
	//populates data fields with genreic data
	function autoFill()
	{
		for(var i in json)
		{
			var id = Math.floor(Math.random()*10000000000);
			localStorage.setItem(id, JSON.stringify(json[i]));
		}
	}
	
	//creates the edit and delete options for each list item
	function createEditDelete(key, linksLI)
	{	
		var linkTexts = ['Edit', 'Delete'];
		var linkIDs = ['edit', 'delete'];
		var linkFunctions = [editItem, deleteItem];
		for(var i = 0; i < 2; i++)
		{
			var link = document.createElement('a');
			link.href = '#';
			link.id = linkIDs[i];
			link.key = key;
			link.addEventListener('click', linkFunctions[i]);
			link.innerHTML = linkTexts[i];
			linksLI.appendChild(link);
		}
	}
	
	//edits the item needs a name change
	function editItem(key)
	{
		var items = localStorage.getItem(this.key);
		var data = JSON.parse(items);
		
		//shows form
		toggleDisplay('off');
		
		//enter current local storage values in form
		$('category').value = data.category[1];
		$('task').value = data.task[1];
		var radios = document.forms[0].importance;
		for(var i = 0; i < radios.length; i++)
		{
			if(radios[i].value == "Very" && data.importance[1] == "Very")
			{
				radios[i].setAttribute("checked", "checked");
			}
			if(radios[i].value == "Some" && data.importance[1] == "Some")
			{
				radios[i].setAttribute("checked", "checked");
			}
			if(radios[i].value == "Little" && data.importance[1] == "Little")
			{
				radios[i].setAttribute("checked", "checked");
			}
		}
		$('startDate').value = data.startDate[1];
		$('endDate').value = data.endDate[1];
		$('hours').value = data.hours[1];
		$('description').value = data.description[1];
		
		//remove save button
		saveData.removeEventListener('click', validate);
		//change submit button to edit button
		$('submit').value = "edit";
		var editSave = $('submit');
		editSave.addEventListener('click', validate);
		editSave.key = this.key;
		
		//removes old div with the id of data
		$('data').remove();
	}
	
	//deletes an item needs a name change
	function deleteItem()
	{
		var confirmDelete = confirm("Delete item?");
		if(confirmDelete)
		{
			localStorage.removeItem(this.key);
			window.location.reload();
		}
	}
	
	//validates the form to make sure everything is filled out that needs to be
	function validate(eventData)
	{
		var getTask = $('task');
		var getDescription = $('description');
		var getError = $('error');
		
		getError.innerHTML = '';
		getTask.style.border = '1px solid black';
		
		var errors = [];
		if(getTask.value === '')
		{
			var error = "Please enter a task.";
			getTask.style.border = '1px solid red';
			errors.push(error);
		}
		if(getDescription.value === '')
		{
			var error = "Please enter a description.";
			getDescription.style.border = '1px solid red';
			errors.push(error);
		}
		if(errors.length >= 1)
		{
			for(var i = 0; i < errors.length; i++)
			{
				var text = document.createElement('li');
				text.innerHTML = errors[i];
				getError.appendChild(text);
			}
			eventData.preventDefault();
			return false;
		}
		else
		{
			saveToLocal(this.key);
			//window.location.reload();
		}
	}
	
	//clears all locally stored data
	function removeLocalData()
	{
		if(localStorage.length === 0)
		{
			alert('List was Empty');
		}
		else
		{
			localStorage.clear();
			alert('Deleted List');
			window.location.reload();
			return false;
		}
	}
	
	displayData.addEventListener('click', getLocalData);	
	clearData.addEventListener('click', removeLocalData);
	saveData.addEventListener('click', validate);
});