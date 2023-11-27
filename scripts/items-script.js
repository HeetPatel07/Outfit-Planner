let categories = document.querySelectorAll('.category');
let tables = document.querySelectorAll('.table');
let selectedCategory = "tops";
let selectedItem;
let currentPage = 0;
currentModal = "";          // Keeps track of current Modal that is open
currentCBox = "";          // Keeps track of current Confirmation Box that is open
let pagedData;
let selectedTable;
let selectedList;
loadButtons();

// Default selected category is tops([1])
categories[1].classList.add('selected');

categories.forEach(function(category) {
    category.addEventListener('click', function() {
        categories.forEach(function(c) {
            c.classList.remove('selected');
        });
        this.classList.add('selected');

        // Hide all tables
        tables.forEach(function(table) {
            table.style.display = 'none';
        });

        // Show the table corresponding to the selected category
        selectedCategory = this.getAttribute('data-category');
        let selectedTable = document.querySelector('.' + selectedCategory);
        selectedTable.style.display = 'block';
        loadButtons();

        togglePaginationBtnsDisabled();
    });
});

const Weather = {
    SUNNY: Symbol('SUNNY'),
    WINDY: Symbol('WINDY'),
    RAINY: Symbol('RAINY'),
    SNOWY: Symbol('SNOWY')
}

const Category = {
    HEADS: Symbol('HEADS'),
    TOPS: Symbol('TOPS'),
    BOTTOMS: Symbol('BOTTOMS'),
    SHOES: Symbol('SHOES')
}

class Item {
    constructor(name, brand, weather, category) {
        this.name = name;
        this.brand = brand;
        this.weather = weather;
        this.category = category;
    }
}

head1 = new Item("Winter Beanie", "Adidas", Weather.SNOWY, Category.HEADS);
head2 = new Item("Winter Beanie", "North Face", Weather.SNOWY, Category.HEADS);
head3 = new Item("Summer Cap", "Nike", Weather.SUNNY, Category.HEADS);
head4 = new Item("Hiking Cap", "North Face", Weather.WINDY, Category.HEADS);
head5 = new Item("Trucker Cap", "Asos", Weather.SUNNY, Category.HEADS);
head6 = new Item("Winter Beanie", "Adidas", Weather.SNOWY, Category.HEADS);
head7 = new Item("Winter Beanie", "North Face", Weather.SNOWY, Category.HEADS);
head8 = new Item("Summer Cap", "Nike", Weather.SUNNY, Category.HEADS);
head9 = new Item("Hiking Cap", "North Face", Weather.WINDY, Category.HEADS);

top1 = new Item("Winter Jacket", "North Face", Weather.SNOWY, Category.TOPS);
top2 = new Item("Long Sleeve", "Stüssy", Weather.SUNNY, Category.TOPS);
top3 = new Item("Summer T-Shirt", "Nike", Weather.SUNNY, Category.TOPS);
top4 = new Item("Hiking Jacket", "Adidas", Weather.WINDY, Category.TOPS);
top5 = new Item("Summer Shirt", "Asos", Weather.SUNNY, Category.TOPS);
top6 = new Item("Winter Jacket", "North Face", Weather.SNOWY, Category.TOPS);
top7 = new Item("Long Sleeve", "Stüssy", Weather.SUNNY, Category.TOPS);
top8 = new Item("Summer T-Shirt", "Nike", Weather.SUNNY, Category.TOPS);
top9 = new Item("Hiking Jacket", "Adidas", Weather.WINDY, Category.TOPS);

bottom1 = new Item("Ski Pants", "North Face", Weather.SNOWY, Category.BOTTOMS);
bottom2 = new Item("Loose Jeans", "Levi's", Weather.SUNNY, Category.BOTTOMS);
bottom3 = new Item("Cargo Pants", "H&M", Weather.SUNNY, Category.BOTTOMS);
bottom4 = new Item("Hiking Pants", "North Face", Weather.WINDY, Category.BOTTOMS);
bottom5 = new Item("Track Pants", "Adidas", Weather.SUNNY, Category.BOTTOMS);
bottom6 = new Item("Ski Pants", "North Face", Weather.SNOWY, Category.BOTTOMS);
bottom7 = new Item("Loose Jeans", "Levi's", Weather.SUNNY, Category.BOTTOMS);
bottom8 = new Item("Cargo Pants", "H&M", Weather.SUNNY, Category.BOTTOMS);
bottom9 = new Item("Hiking Pants", "North Face", Weather.WINDY, Category.BOTTOMS);

shoes1 = new Item("Air Force 1", "Nike", Weather.SUNNY, Category.SHOES);
shoes2 = new Item("Dunk Lows", "Nike", Weather.SUNNY, Category.SHOES);
shoes3 = new Item("Jordan 1 Low", "Jordan", Weather.SUNNY, Category.SHOES);
shoes4 = new Item("Jordan 8 Winterized", "Jordan", Weather.SNOWY, Category.SHOES);
shoes5 = new Item("Chucks High CDG", "Converse", Weather.SUNNY, Category.SHOES);
shoes6 = new Item("Air Force 1", "Nike", Weather.SUNNY, Category.SHOES);
shoes7 = new Item("Dunk Lows", "Nike", Weather.SUNNY, Category.SHOES);
shoes8 = new Item("Jordan 1 Low", "Jordan", Weather.SUNNY, Category.SHOES);
shoes9 = new Item("Jordan 8 Winterized", "Jordan", Weather.SNOWY, Category.SHOES);

let hatsList = [];
var hatsTable = document.querySelector('#hats-table tbody');
let topsList = [];
var topsTable = document.querySelector('#tops-table tbody');
let bottomsList = [];
var bottomsTable = document.querySelector('#bottoms-table tbody');
let shoesList = [];
var shoesTable = document.querySelector('#shoes-table tbody');

hatsList.push(head1, head2, head3, head4, head5,
    head6, head7, head8, head9);
let pagedHats = chunkArray(hatsList, 9);
addDataToTable(hatsTable, pagedHats, 0, false);

topsList.push(top1, top2, top3, top4, top5,
    top6, top7, top8, top9);
let pagedTops = chunkArray(topsList, 9);
addDataToTable(topsTable, pagedTops, 0, false);

bottomsList.push(bottom1, bottom2, bottom3, bottom4, bottom5,
    bottom6, bottom7, bottom8, bottom9);
let pagedBottoms = chunkArray(bottomsList, 9);
addDataToTable(bottomsTable, pagedBottoms, 0, false);

shoesList.push(shoes1, shoes2, shoes3, shoes4, shoes5,
    shoes6, shoes7, shoes8, shoes9);
let pagedShoes = chunkArray(shoesList, 9);
addDataToTable(shoesTable, pagedShoes, 0, false);

togglePaginationBtnsDisabled();

function chunkArray(array, chunkSize) {
    var result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}

function loadButtons() {
    document.getElementById(selectedCategory + '-next').onclick = function() {
        if (currentPage < pagedData.length - 1) {
            currentPage++;
            refreshTableData(selectedTable, pagedData);
            addDataToTable(selectedTable, pagedData, currentPage, false);
            togglePaginationBtnsDisabled();
        }
    };

    document.getElementById(selectedCategory + '-prev').onclick = function() {
        if (currentPage > 0) {
            currentPage--;
            refreshTableData(selectedTable, pagedData);
            addDataToTable(selectedTable, pagedData, currentPage, false);
            togglePaginationBtnsDisabled();
        }
    };
}

var searchField = document.getElementById("item-search");
var form = document.getElementById('search-form');

// Prevent form from submitting
form.onsubmit = function(e) {
    e.preventDefault();
    performSearch();
}

function performSearch() {

    // get the input field value (lowercased for case-insensitive search)
    var searchValue = searchField.value;
    console.log('Search Value: ', searchValue);

    console.log(selectedList);

    // filter your objects
    var filteredObjects = selectedList.filter(function(obj) {
        console.log('Checking: ', obj);
        console.log('Is instance of Item:', obj instanceof Item);
        // check if name and brand attributes exist before calling toLowerCase
        var name = obj.name;
        var brand = obj.brand;

        console.log('Name: ', name);
        console.log('Brand: ', brand);

        return name.includes(searchValue) || brand.includes(searchValue);
    });

    console.log("Filtered Objects:", filteredObjects);

    // now the "filteredObjects" array contains only those objects that match the search;
    // you should now update your table using this array.
    addDataToTable(selectedTable, filteredObjects, 0, true);
    refreshTableData(selectedTable, filteredObjects);
}

function togglePaginationBtnsDisabled() {
    setPaginationVariables();
    if(currentPage == 0) {
        document.getElementById(selectedCategory + '-prev').disabled = true;
    } else {
        document.getElementById(selectedCategory + '-prev').disabled = false;
    }
    if(currentPage == pagedData.length - 1) {
        document.getElementById(selectedCategory + '-next').disabled = true;
    } else {
        document.getElementById(selectedCategory + '-next').disabled = false;
    }
}

function setPaginationVariables() {
    switch (selectedCategory) {
        case 'hats':
            pagedData = pagedHats;
            selectedTable = hatsTable;
            selectedList = hatsList;
            break;
        case 'tops':
            pagedData = pagedTops;
            selectedTable = topsTable;
            selectedList = topsList;
            break;
        case 'bottoms':
            pagedData = pagedBottoms;
            selectedTable = bottomsTable;
            selectedList = bottomsList;
            break;
        case 'shoes':
            pagedData = pagedShoes;
            selectedTable = shoesTable;
            selectedList = shoesList;
            break;
    }
}

function calculatePageNum(category) {

    let categoryList;

    switch(category) {
        case "hats": categoryList = hatsList; break;
        case "tops": categoryList = topsList; break;
        case "bottoms": categoryList = bottomsList; break;
        case "shoes": categoryList = shoesList; break;
    }

    return Math.floor((categoryList.length / 10) + 1);
}

function selectItem(cell) {
    var buttonDiv = cell.querySelector('.edit-delete-item-btns');

    // If buttonDiv doesn't exist, log an error message and exit the function
    if (!buttonDiv) {
        console.error('No div with class "edit-delete-item-btns" found within the cell');
        return;
    }

    if(buttonDiv.style.display === 'none' || buttonDiv.style.display === '' ) {
        buttonDiv.style.display = 'block';
    } else {
        buttonDiv.style.display = 'none';
    }
}

function cancelOperation() {
    closeCBox();
    closeModal();
}

function openItemEditModal(item) {
    openModal('itemsEditModal');
    document.getElementById('item-edit-name').value = String(item.name);
    document.getElementById('item-edit-brand').value = String(item.brand);
    document.getElementById('item-edit-weather').value = String(item.weather);
}

// *************************
// Data Management functions
// *************************

/*
* ADD DATA TO CORRESPONDING TABLE
* Adds data in form of an array with arrays into a table element.
*/
function addDataToTable(table, data, pageNumber, filtered) {
    const columns = 3; // number of columns to fill

    let pageItems;
    if(!filtered) {
        pageItems = data[pageNumber];
    } else {
        pageItems = data;
    }
    pageItems.forEach((item, i) => {
        // Calculate row and column indices
        const rowIndex = Math.floor(i / columns);
        const colIndex = (i % columns) + 1;

        if (table.rows[rowIndex]) {
            let cell = table.rows[rowIndex].cells[colIndex];

            if (!cell) {
                cell = table.rows[rowIndex].insertCell(colIndex);
            }

            // Check if item.name exists before creating the buttonDiv and attaching the click event
            if (item.name) {
                // Create a new div containing edit and delete buttons
                const buttonDiv = document.createElement('div');
                buttonDiv.className = 'edit-delete-item-btns';
                buttonDiv.style.display = 'none';

                // Create Edit and Delete Buttons
                const editButton = document.createElement('button');
                editButton.innerText = 'Edit';
                editButton.onclick = function(e) {
                    e.stopPropagation();  // prevent triggering cell's onclick event
                    openItemEditModal(item);  // call your edit function
                    selectedItem = item;
                };

                const deleteButton = document.createElement('button');
                deleteButton.innerText = 'Delete';
                deleteButton.onclick = function(e) {
                    e.stopPropagation();
                    openCBox('deleteItemCBox');
                    selectedItem = item;
                }

                buttonDiv.appendChild(editButton);
                buttonDiv.appendChild(deleteButton);

                // Add item name and buttons div to cell
                if (typeof item.name === 'symbol') {
                    cell.innerHTML = String(item.name);
                } else {
                    cell.innerHTML = item.name;
                }

                cell.appendChild(buttonDiv);

                // Attach click handler to the cell
                cell.onclick = function() {
                    selectItem(this);
                };
            }
        }
    });
}

function refreshTableData(table, data) {

    // create a Map for quick lookup
    let dataMap = new Map(data.map(item => [item.name, item]));

    // Loop to iterate over table cells
    for (let i = 0, row; row = table.rows[i]; i++) {
        for(let j = 0, cell; cell = row.cells[j]; j++) {

            // Get the object name displayed in the cell without the buttons
            let cellText = cell.childNodes[0]?.nodeValue?.trim();

            if(cellText && !dataMap.has(cellText)) {
                // Object is no longer present in data array, clear cell content
                cell.innerHTML = "";
            }
        }
    }
}

//-------------------------------------------
//Items functions

function createItem(category) {
    var itemName = document.querySelector('#item-create-name');
    var itemBrand = document.querySelector('#item-create-brand');
    var itemWeather = document.querySelector('#item-create-weather');
    var itemCategory;

    switch(itemWeather.value) {
        case "Sunny": itemWeather = Weather.SUNNY; break;
        case "Rainy": itemWeather = Weather.RAINY; break;
        case "Windy": itemWeather = Weather.WINDY; break;
        case "Snowy": itemWeather = Weather.SNOWY; break;
    }

    switch(category) {
        case "hats": itemCategory = Category.HEADS; break;
        case "tops": itemCategory = Category.TOPS; break;
        case "bottoms": itemCategory = Category.BOTTOMS; break;
        case "shoes": itemCategory = Category.SHOES; break;
    }

    var newItem = new Item(itemName.value, itemBrand.value, itemWeather, itemCategory);

    switch(category) {
        case "hats":
            hatsList.push(newItem);
            pagedHats = chunkArray(hatsList, 9);
            addDataToTable(hatsTable, pagedHats, calculatePageNum(category) - 1, false);
            break;
        case "tops":
            topsList.push(newItem);
            pagedTops = chunkArray(topsList, 9);
            addDataToTable(topsTable, pagedTops, calculatePageNum(category) - 1, false);
            break;
        case "bottoms":
            bottomsList.push(newItem);
            pagedBottoms = chunkArray(bottomsList, 9);
            addDataToTable(bottomsTable, pagedBottoms, calculatePageNum(category) - 1, false);
            break;
        case "shoes":
            shoesList.push(newItem);
            pagedShoes = chunkArray(shoesList, 9);
            addDataToTable(shoesTable, pagedShoes, calculatePageNum(category) - 1, false);
            break;
    }

    closeModal();
}

function editItem(item) {
    var itemName = document.querySelector('#item-edit-name');
    var itemBrand = document.querySelector('#item-edit-brand');
    var itemWeather = document.querySelector('#item-edit-weather');

    switch(itemWeather.value) {
        case "Sunny": itemWeather = Weather.SUNNY; break;
        case "Rainy": itemWeather = Weather.RAINY; break;
        case "Windy": itemWeather = Weather.WINDY; break;
        case "Snowy": itemWeather = Weather.SNOWY; break;
    }

    let newItem = new Item(itemName.value, itemBrand.value, itemWeather.value, item.category);

    switch(item.category) {
        case Category.HEADS:
            var index = hatsList.indexOf(item);
            hatsList[index] = newItem;
            pagedHats = chunkArray(hatsList, 9);
            addDataToTable(hatsTable, pagedHats, calculatePageNum('hats') - 1, false);
            break;
        case Category.TOPS:
            var index = topsList.indexOf(item);
            topsList[index] = newItem;
            pagedTops = chunkArray(topsList, 9);
            addDataToTable(topsTable, pagedTops, calculatePageNum('tops') - 1, false);
            break;
        case Category.BOTTOMS:
            var index = bottomsList.indexOf(item);
            bottomsList[index] = newItem;
            pagedBottoms = chunkArray(bottomsList, 9);
            addDataToTable(bottomsTable, pagedBottoms, calculatePageNum('bottoms') - 1, false);
            break;
        case Category.SHOES:
            var index = shoesList.indexOf(item);
            shoesList[index] = newItem;
            pagedShoes = chunkArray(shoesList, 9);
            addDataToTable(shoesTable, pagedShoes, calculatePageNum('shoes') - 1, false);
            break;
    }

    closeModal();
    closeCBox();
}

function deleteItem(item) {

    switch(item.category) {
        case Category.HEADS:
            var index = hatsList.indexOf(item);
            hatsList.splice(index, 1);
            pagedHats = chunkArray(hatsList, 9);
            refreshTableData(hatsTable, pagedHats);
            break;
        case Category.TOPS:
            var index = topsList.indexOf(item);
            topsList.splice(index, 1);
            pagedTops = chunkArray(topsList, 9);
            refreshTableData(topsTable, pagedTops);
            break;
        case Category.BOTTOMS:
            var index = bottomsList.indexOf(item);
            bottomsList.splice(index, 1);
            pagedBottoms = chunkArray(bottomsList, 9);
            refreshTableData(bottomsTable, pagedBottoms);
            break;
        case Category.SHOES:
            var index = shoesList.indexOf(item);
            shoesList.splice(index, 1);
            pagedShoes = chunkArray(shoesList, 9);
            refreshTableData(shoesTable, pagedShoes);
            break;
    }
    closeCBox();
}