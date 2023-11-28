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
let currentCell = null;
loadButtons();

let hatsImages = [
    // Beanie
    "https://www.pngall.com/wp-content/uploads/12/Beanie-PNG-HD-Image.png",
    // Cap Brown
    "https://static.vecteezy.com/system/resources/previews/011/356/628/original/black-baseball-cap-png.png",
    // Cap Yellow
    "https://www.freeiconspng.com/uploads/baseball-yellow-cap-hat-png-15.png",
    // Cap White
    "https://pngimg.com/d/cap_PNG5675.png"
]
let topsImages = [
    // Winter Jacket
    "https://freepngimg.com/save/37126-jacket-transparent-image/496x549",
    // Hiking Jacket
    "https://purepng.com/public/uploads/large/purepng.com-xtreme-jacketgarmentupper-bodyjacketlighterxtreme-142152636207609t4e.png",
    // Long Sleeve
    "https://png.pngtree.com/png-clipart/20220803/ourmid/pngtree-free-long-sleeve-t-shirt-mockup--psd-png-image_6096671.png",
    // T-Shirt
    "https://www.freepnglogos.com/uploads/t-shirt-png/t-shirt-png-download-white-shirt-png-image-png-image-pngimg-7.png",
    // Summer Shirt
    "https://www.pngkey.com/png/full/315-3153633_faherty-brand-hawaiian-shirt-coco-republic-polo-shirt.png"
]
let bottomsImages = [
    // Cargo Pants
    "https://freepngimg.com/thumb/cargo_pant/5-2-cargo-pant-png-thumb.png",
    // Jeans
    "https://pngimg.com/d/jeans_PNG5755.png",
    // Ski Pants
    "https://freepngimg.com/save/11031-cargo-pant-picture/1300x1733",
    // Hiking Pants
    "https://freepngimg.com/save/11033-cargo-pant-png/800x1200",
    // Track Pants
    "https://banner2.cleanpng.com/20180410/hpw/kisspng-tracksuit-hoodie-adidas-sweatpants-pant-5acc53234eb664.4359810215233400673224.jpg"
]
let shoesImages = [
    // AF1
    "https://www.pngarts.com/files/8/Nike-Air-Force-One-PNG-Image.png",
    // Dunk Low
    "https://www.soleretriever.com/_next/image?url=https%3A%2F%2Fmedia.soleretriever.com%2F65626725-83cd-4890-b653-099fd83638bb.png&w=1200&q=75",
    // Js 1 Low
    "https://www.pngkey.com/png/full/900-9002054_air-jordan-1-low.png",
    // Js 8
    "https://jordansdaily.com/wp-content/uploads/2017/04/air-jordan-8-hare-2003-1.png",
    // Chucks
    "https://pngimg.com/d/converse_PNG14.png"
]
let selectedImages = topsImages;
let imageIndex = 0;

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
        currentPage = 0;

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
    constructor(image, name, brand, weather, category) {
        this.image = image;
        this.name = name;
        this.brand = brand;
        this.weather = weather;
        this.category = category;
    }
}

head1 = new Item(hatsImages[0], "Winter Beanie", "Adidas", Weather.SNOWY, Category.HEADS);
head2 = new Item(hatsImages[0], "Winter Beanie", "North Face", Weather.SNOWY, Category.HEADS);
head3 = new Item(hatsImages[2], "Summer Cap", "Nike", Weather.SUNNY, Category.HEADS);
head4 = new Item(hatsImages[1], "Hiking Cap", "North Face", Weather.WINDY, Category.HEADS);
head5 = new Item(hatsImages[3], "Trucker Cap", "Asos", Weather.SUNNY, Category.HEADS);
head6 = new Item(hatsImages[0], "Winter Beanie", "Adidas", Weather.SNOWY, Category.HEADS);
head7 = new Item(hatsImages[0], "Winter Beanie", "North Face", Weather.SNOWY, Category.HEADS);
head8 = new Item(hatsImages[2], "Summer Cap", "Nike", Weather.SUNNY, Category.HEADS);
head9 = new Item(hatsImages[1], "Hiking Cap", "North Face", Weather.WINDY, Category.HEADS);

top1 = new Item(topsImages[0], "Winter Jacket", "North Face", Weather.SNOWY, Category.TOPS);
top2 = new Item(topsImages[2], "Long Sleeve", "Stüssy", Weather.SUNNY, Category.TOPS);
top3 = new Item(topsImages[3], "Summer T-Shirt", "Nike", Weather.SUNNY, Category.TOPS);
top4 = new Item(topsImages[1], "Hiking Jacket", "Adidas", Weather.WINDY, Category.TOPS);
top5 = new Item(topsImages[4], "Summer Shirt", "Asos", Weather.SUNNY, Category.TOPS);
top6 = new Item(topsImages[0], "Winter Jacket", "North Face", Weather.SNOWY, Category.TOPS);
top7 = new Item(topsImages[2], "Long Sleeve", "Stüssy", Weather.SUNNY, Category.TOPS);
top8 = new Item(topsImages[3], "Summer T-Shirt", "Nike", Weather.SUNNY, Category.TOPS);
top9 = new Item(topsImages[1], "Hiking Jacket", "Adidas", Weather.WINDY, Category.TOPS);

bottom1 = new Item(bottomsImages[2], "Ski Pants", "North Face", Weather.SNOWY, Category.BOTTOMS);
bottom2 = new Item(bottomsImages[1], "Loose Jeans", "Levi's", Weather.SUNNY, Category.BOTTOMS);
bottom3 = new Item(bottomsImages[0], "Cargo Pants", "H&M", Weather.SUNNY, Category.BOTTOMS);
bottom4 = new Item(bottomsImages[3], "Hiking Pants", "North Face", Weather.WINDY, Category.BOTTOMS);
bottom5 = new Item(bottomsImages[4], "Track Pants", "Adidas", Weather.SUNNY, Category.BOTTOMS);
bottom6 = new Item(bottomsImages[2], "Ski Pants", "North Face", Weather.SNOWY, Category.BOTTOMS);
bottom7 = new Item(bottomsImages[1], "Loose Jeans", "Levi's", Weather.SUNNY, Category.BOTTOMS);
bottom8 = new Item(bottomsImages[0], "Cargo Pants", "H&M", Weather.SUNNY, Category.BOTTOMS);
bottom9 = new Item(bottomsImages[3], "Hiking Pants", "North Face", Weather.WINDY, Category.BOTTOMS);

shoes1 = new Item(shoesImages[0], "Air Force 1", "Nike", Weather.SUNNY, Category.SHOES);
shoes2 = new Item(shoesImages[1], "Dunk Lows", "Nike", Weather.SUNNY, Category.SHOES);
shoes3 = new Item(shoesImages[2], "Jordan 1 Low", "Jordan", Weather.SUNNY, Category.SHOES);
shoes4 = new Item(shoesImages[3], "Jordan 8 Winterized", "Jordan", Weather.SNOWY, Category.SHOES);
shoes5 = new Item(shoesImages[4], "Chucks High CDG", "Converse", Weather.SUNNY, Category.SHOES);
shoes6 = new Item(shoesImages[0], "Air Force 1", "Nike", Weather.SUNNY, Category.SHOES);
shoes7 = new Item(shoesImages[1], "Dunk Lows", "Nike", Weather.SUNNY, Category.SHOES);
shoes8 = new Item(shoesImages[2], "Jordan 1 Low", "Jordan", Weather.SUNNY, Category.SHOES);
shoes9 = new Item(shoesImages[3], "Jordan 8 Winterized", "Jordan", Weather.SNOWY, Category.SHOES);

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
        nextPage(1);
    };

    document.getElementById(selectedCategory + '-prev').onclick = function() {
        prevPage(1);
    };
}

function nextPage(pageNum) {
    if (currentPage < pagedData.length - 1) {
        currentPage += pageNum;
        clearTable(selectedTable);
        addDataToTable(selectedTable, pagedData, currentPage, false);
        togglePaginationBtnsDisabled();
    }
}

function prevPage(pageNum) {
    if (currentPage > 0) {
        currentPage -= pageNum;
        clearTable(selectedTable);
        addDataToTable(selectedTable, pagedData, currentPage, false);
        togglePaginationBtnsDisabled();
    }
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
    let resultStringClass = document.querySelector('.search-string');
    let resultString;
    if(document.querySelector('.search-output') == null) {
        resultString = document.createElement('p');
    } else {
        resultString = document.querySelector('.search-output');
    }
    resultString.className = "search-output";
    if(searchValue !== "") {
        resultString.innerText = "Showing " + filteredObjects.length + " results for " + searchValue + ":";
    } else {
        resultString.innerText = "";
    }
    resultStringClass.appendChild(resultString);

    console.log("Filtered Objects:", filteredObjects);

    // now the "filteredObjects" array contains only those objects that match the search;
    // you should now update your table using this array.
    clearTable(selectedTable);
    addDataToTable(selectedTable, filteredObjects, 0, true);
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
    imageIndex = 0;
    switch (selectedCategory) {
        case 'hats':
            pagedData = pagedHats;
            selectedTable = hatsTable;
            selectedList = hatsList;
            selectedImages = hatsImages;
            break;
        case 'tops':
            pagedData = pagedTops;
            selectedTable = topsTable;
            selectedList = topsList;
            selectedImages = topsImages;
            break;
        case 'bottoms':
            pagedData = pagedBottoms;
            selectedTable = bottomsTable;
            selectedList = bottomsList;
            selectedImages = bottomsImages;
            break;
        case 'shoes':
            pagedData = pagedShoes;
            selectedTable = shoesTable;
            selectedList = shoesList;
            selectedImages = shoesImages;
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
    // If the clicked cell is already the selected cell, deselect it
    if (cell === currentCell) {
        cell.querySelector('.edit-delete-item-btns').style.display = 'none';
        cell.classList.remove('selected');
        currentCell = null;
        return;
    }

    // If there's a selected cell, hide its buttons
    if (currentCell) {
        currentCell.querySelector('.edit-delete-item-btns').style.display = 'none';
        currentCell.classList.remove('selected');
    }

    // Select the clicked cell and show its buttons
    cell.querySelector('.edit-delete-item-btns').style.display = 'block';
    cell.classList.add('selected');
    currentCell = cell;
}

function cancelOperation() {
    closeCBox();
    closeModal();
}

function openItemCreateModal() {
    openModal('itemsCreateModal');
    document.getElementById('item-create-image').src = selectedImages[imageIndex];
}

function iterateThroughImages(imageElement) {
    if(imageIndex < selectedImages.length - 1) {
        imageIndex++;
    } else {
        imageIndex = 0;
    }
    document.getElementById(imageElement).src = selectedImages[imageIndex]
}

function openItemEditModal(item) {
    openModal('itemsEditModal');
    document.getElementById('item-edit-image').src = String(item.image);
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
                //editButton.innerText = 'Edit';
                editButton.className = 'item-edit-btn';
                editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
                editButton.onclick = function(e) {
                    e.stopPropagation();  // prevent triggering cell's onclick event
                    openItemEditModal(item);  // call your edit function
                    selectedItem = item;
                };

                const deleteButton = document.createElement('button');
                //deleteButton.innerText = 'Delete';
                deleteButton.className = 'item-delete-btn';
                deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
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
                cell.innerHTML = `<img src="${item.image}" width='150px' height='150px'>`

                cell.appendChild(buttonDiv);

                // Attach click handler to the cell
                cell.onclick = function() {
                    selectItem(this);
                };
            }
        }
    });
}

function clearTable(table) {
    for (let i = 0, row; row = table.rows[i]; i++) {
        for(let j = 1, cell; cell = row.cells[j]; j++) {
            if(j <= 3) {
                cell.innerHTML = "";
            }
        }
    }
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

    var newItem = new Item(selectedImages[imageIndex], itemName.value, itemBrand.value, itemWeather, itemCategory);

    switch(category) {
        case "hats":
            hatsList.push(newItem);
            pagedHats = chunkArray(hatsList, 9);
            pagedData = pagedHats;
            if((hatsList.length % 9) === 1) {
                nextPage(1);
            }
            addDataToTable(hatsTable, pagedHats, calculatePageNum(category) - 1, false);
            break;
        case "tops":
            topsList.push(newItem);
            pagedTops = chunkArray(topsList, 9);
            pagedData = pagedTops;
            console.log("Paged Data Length: ", pagedData.length);
            console.log("Current Page: ", currentPage);
            console.log("Tops List Length % 9: ", topsList.length % 9);
            if((topsList.length % 9) === 1) nextPage(1);
            addDataToTable(topsTable, pagedTops, calculatePageNum(category) - 1, false);
            break;
        case "bottoms":
            bottomsList.push(newItem);
            pagedBottoms = chunkArray(bottomsList, 9);
            pagedData = pagedBottoms;
            if((bottomsList.length % 9) === 1) nextPage(1);
            addDataToTable(bottomsTable, pagedBottoms, calculatePageNum(category) - 1, false);
            break;
        case "shoes":
            shoesList.push(newItem);
            pagedShoes = chunkArray(shoesList, 9);
            pagedData = pagedShoes;
            if((shoesList.length % 9) === 1) nextPage(1);
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

    let newItem = new Item(selectedImages[imageIndex], itemName.value, itemBrand.value, itemWeather.value, item.category);

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
            pagedData = pagedHats;
            if(currentPage > 0 && (hatsList.length % 9) === 0) {
                prevPage(1);
            } else {
                clearTable(hatsTable);
                addDataToTable(hatsTable, pagedHats, currentPage, false);
            }
            break;
        case Category.TOPS:
            var index = topsList.indexOf(item);
            topsList.splice(index, 1);
            pagedTops = chunkArray(topsList, 9);
            pagedData = pagedTops;
            if(currentPage > 0 && (topsList.length % 9) === 0) {
                prevPage(1);
            } else {
                clearTable(topsTable);
                addDataToTable(topsTable, pagedTops, currentPage, false);
            }
            break;
        case Category.BOTTOMS:
            var index = bottomsList.indexOf(item);
            bottomsList.splice(index, 1);
            pagedBottoms = chunkArray(bottomsList, 9);
            pagedData = pagedBottoms;
            if(currentPage > 0 && (bottomsList.length % 9) === 0) {
                prevPage(1);
            } else {
                clearTable(bottomsTable);
                addDataToTable(bottomsTable, pagedBottoms, currentPage, false);
            }
            break;
        case Category.SHOES:
            var index = shoesList.indexOf(item);
            shoesList.splice(index, 1);
            pagedShoes = chunkArray(shoesList, 9);
            pagedData = pagedShoes;
            if(currentPage > 0 && (shoesList.length % 9) === 0) {
                prevPage(1);
            } else {
                clearTable(shoesTable);
                addDataToTable(shoesTable, pagedShoes, currentPage, false);
            }
            break;
    }
    closeCBox();
}