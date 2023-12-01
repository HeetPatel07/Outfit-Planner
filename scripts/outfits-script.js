let currentOutfit = 0;
let currentOutfitPage = 0;
let currentModalPage = 0;
let currentEditModalPage = 0;
let categoriesModal = document.querySelectorAll('.category-modal');
let categoriesEditModal = document.querySelectorAll('.category-edit-modal');
let tablesModal = document.querySelectorAll('.table-modal');
let tablesEditModal = document.querySelectorAll('.table-edit-modal');
let modalItems = [];
let currentModalCell;
let selectedModalTable;
let selectedModalCategory = "tops";
let selectedEditModalTable;
let selectedEditModalCategory = "tops";
let outfitIndex = 0;

loadOutfitButtons();

categoriesModal.forEach(function(category) {
    category.addEventListener('click', function() {
        categoriesModal.forEach(function(c) {
            c.classList.remove('selected');
        });
        this.classList.add('selected');

        // Hide all tables
        tablesModal.forEach(function(table) {
            table.style.display = 'none';
        });

        // Show the table corresponding to the selected category
        selectedModalCategory = this.getAttribute('data-category');
        let selectedTable = document.querySelector('.' + selectedModalCategory + '-modal');
        selectedTable.style.display = 'block';
        currentModalPage = 0;

        setModalPaginationVariables();
        loadModalButtons();
        clearTable(selectedModalTable);
        addOutfitDataToModalTable(selectedModalTable, pagedData, 0, false, 3, 'create');
    });
});

categoriesEditModal.forEach(function(category) {
    category.addEventListener('click', function() {
        categoriesEditModal.forEach(function(c) {
            c.classList.remove('selected');
        });
        this.classList.add('selected');

        // Hide all tables
        tablesEditModal.forEach(function(table) {
            table.style.display = 'none';
        });

        // Show the table corresponding to the selected category
        selectedEditModalCategory = this.getAttribute('data-category');
        let selectedTable = document.querySelector('.' + selectedEditModalCategory + '-edit-modal');
        selectedTable.style.display = 'block';
        currentEditModalPage = 0;

        setEditModalPaginationVariables();
        loadModalButtons();
        clearTable(selectedEditModalTable);
        addOutfitDataToModalTable(selectedEditModalTable, pagedData, 0, false, 3, 'edit');
    });
});


class Outfit {
    constructor(name, description, items) {
        this.name = name;
        this.description = description;
        this.items = items;
    }
}

outfit1 = new Outfit("Outfit 1", "This is outfit 1", [top1, bottom2, shoes3, other4]);
outfit2 = new Outfit("Outfit 2", "This is outfit 2", [top2, bottom3, shoes4, other5]);
outfit3 = new Outfit("Outfit 3", "This is outfit 3", [top3, bottom4, shoes1, other1]);

let outfits = [];
outfits.push(outfit1, outfit2, outfit3);
var outfitsTable = document.querySelector('.outfit-display tbody');
addOutfitDataToTable(outfitsTable, outfits[currentOutfit].items, 0, 3, 150, 150);

var othersTableModal = document.querySelector('#modal-others-create-table tbody');
addOutfitDataToModalTable(othersTableModal, pagedothers, 0, false, 3, 'create');

var topsTableModal = document.querySelector('#modal-tops-create-table tbody');
addOutfitDataToModalTable(topsTableModal, pagedTops, 0, false, 3, 'create');

var bottomsTableModal = document.querySelector('#modal-bottoms-create-table tbody');
addOutfitDataToModalTable(bottomsTableModal, pagedBottoms, 0, false,  3, 'create');

var shoesTableModal = document.querySelector('#modal-shoes-create-table tbody');
addOutfitDataToModalTable(shoesTableModal, pagedShoes, 0, false,  3, 'create');

var othersEditTableModal = document.querySelector('#modal-others-edit-table tbody');
addOutfitDataToModalTable(othersEditTableModal, pagedothers, 0, false, 3, 'edit');

var topsEditTableModal = document.querySelector('#modal-tops-edit-table tbody');
addOutfitDataToModalTable(topsEditTableModal, pagedTops, 0, false, 3, 'edit');

var bottomsEditTableModal = document.querySelector('#modal-bottoms-edit-table tbody');
addOutfitDataToModalTable(bottomsEditTableModal, pagedBottoms, 0, false,  3, 'edit');

var shoesEditTableModal = document.querySelector('#modal-shoes-edit-table tbody');
addOutfitDataToModalTable(shoesEditTableModal, pagedShoes, 0, false,  3, 'edit');

let postOutfitTable = document.querySelector('.social-post-outfit-display');
addOutfitDataToTable(postOutfitTable, outfits[outfitIndex].items, currentOutfitPage, 3, 150, 150);
let postSocialOutfitTitle = document.querySelector('#outfit-social-post-title');
postSocialOutfitTitle.textContent = outfits[outfitIndex].name;
let postSocialOutfitDescription = document.querySelector('#outfit-social-post-description');
postSocialOutfitDescription.textContent = outfits[outfitIndex].description;

var modalSelectionTable = document.querySelector('#active-create-box tbody');
var modalEditSelectionTable = document.querySelector('#active-edit-box tbody');
let selectedOutfit = outfits[currentOutfitPage];
selectedModalTable = topsTableModal;
selectedEditModalTable = topsEditTableModal;

let outfitTitle = document.querySelector('#outfit-title');
outfitTitle.textContent = selectedOutfit.name;

let outfitDescription = document.querySelector('#outfit-description');
outfitDescription.textContent = selectedOutfit.description;

function addOutfitDataToTable(table, data, pageNumber, columns, width, height) {
    data.forEach((item, i) => {
        // Calculate row and column indices
        const rowIndex = Math.floor(i / columns);
        const colIndex = (i % columns);

        if (table.rows[rowIndex]) {
            let cell = table.rows[rowIndex].cells[colIndex];

            if (!cell) {
                cell = table.rows[rowIndex].insertCell(colIndex);
            }

            if (item.name) {
                cell.innerHTML = `<img src="${item.image}" width='${width}' height='${height}'>`
            }
        }
    });
}

function addOutfitDataToModalTable(table, data, pageNumber, filtered, columns, mode) {

    console.log("------------------ ADD OUTFIT DATA TO MODAL TABLE-----------------------------");
    console.log("Table: ", data);
    console.log("Data: ", data);
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
                cell.innerHTML = `<img src="${item.image}" width='100px' height='100px'>`;

                // Attach click handler to the cell
                cell.onclick = function() {
                    selectItemModal(this, mode);
                };
            }
        }
    });
}

function addOutfitDataToModalSelectionTable(table, data, columns, width, height, mode) {

    console.log("------------------ ADD OUTFIT DATA TO MODAL SELECTION TABLE-----------------------------");
    console.log("Table: ", table);
    console.log("Data: ", data);

    data.forEach((item, i) => {
        // Calculate row and column indices
        const rowIndex = Math.floor(i / columns);
        const colIndex = (i % columns);

        if (table.rows[rowIndex]) {
            let cell = table.rows[rowIndex].cells[colIndex];

            if (!cell) {
                cell = table.rows[rowIndex].insertCell(colIndex);
            }

            // Check if item.name exists before creating the buttonDiv and attaching the click event
            if (item.name) {
                cell.innerHTML = `<img src="${item.image}" width='${width}' height='${height}'>`


                const deleteItemDiv = document.createElement('div');
                deleteItemDiv.className = 'remove-selected-item';

                const removeBtn = document.createElement('button');
                removeBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
                removeBtn.onclick = function () {
                    removeSelectedItem(cell, mode);
                }

                deleteItemDiv.appendChild(removeBtn);
                cell.appendChild(deleteItemDiv);
            }
        }
    });
}

function setModalPaginationVariables() {
    console.log(selectedModalCategory);
    switch (selectedModalCategory) {
        case 'others':
            pagedData = pagedothers;
            selectedModalTable = othersTableModal;
            break;
        case 'tops':
            pagedData = pagedTops;
            selectedModalTable = topsTableModal;
            break;
        case 'bottoms':
            pagedData = pagedBottoms;
            selectedModalTable = bottomsTableModal;
            break;
        case 'shoes':
            pagedData = pagedShoes;
            selectedModalTable = shoesTableModal;
            break;
    }
}

function setEditModalPaginationVariables() {
    console.log(selectedModalCategory);
    switch (selectedEditModalCategory) {
        case 'others':
            pagedData = pagedothers;
            selectedEditModalTable = othersEditTableModal;
            break;
        case 'tops':
            pagedData = pagedTops;
            selectedEditModalTable = topsEditTableModal;
            break;
        case 'bottoms':
            pagedData = pagedBottoms;
            selectedEditModalTable = bottomsEditTableModal;
            break;
        case 'shoes':
            pagedData = pagedShoes;
            selectedEditModalTable = shoesEditTableModal;
            break;
    }
}

function loadOutfitButtons() {
    document.getElementById('outfit-arrow-right').onclick = function() {
        nextOutfitPage(1);
    };

    document.getElementById('outfit-arrow-left').onclick = function() {
        prevOutfitPage(1);
    };
}

function loadModalButtons() {
    console.log("Paged Data Length: ", pagedData.length);
    console.log("Button: ", 'modal-' + selectedModalCategory + '-create-next');

    document.getElementById('modal-' + selectedModalCategory + '-create-next').onclick = function() {
        nextModalPage(1, 'create');
    };

    document.getElementById('modal-' + selectedModalCategory + '-create-prev').onclick = function() {
        prevModalPage(1, 'create');
    };

    document.getElementById('modal-' + selectedEditModalCategory + '-edit-next').onclick = function() {
        nextEditModalPage(1, 'edit');
    };

    document.getElementById('modal-' + selectedEditModalCategory + '-edit-prev').onclick = function() {
        prevEditModalPage(1, 'edit');
    };
}

function clearOutfitTable(table) {
    for (let i = 0, row; row = table.rows[i]; i++) {
        for(let j = 0, cell; cell = row.cells[j]; j++) {
            cell.innerHTML = "";
        }
    }
}

function nextOutfitPage(pageNum) {
    if (currentOutfitPage < outfits.length - 1) {
        currentOutfitPage += pageNum;
        selectedOutfit = outfits[currentOutfitPage];
        outfitTitle.textContent = selectedOutfit.name;
        outfitDescription.textContent = selectedOutfit.description;
        clearOutfitTable(outfitsTable);
        addOutfitDataToTable(outfitsTable, outfits[currentOutfitPage].items, currentOutfitPage, 3, 150, 150);
    }
}

function prevOutfitPage(pageNum) {
    if (currentOutfitPage > 0) {
        currentOutfitPage -= pageNum;
        selectedOutfit = outfits[currentOutfitPage];
        outfitTitle.textContent = selectedOutfit.name;
        outfitDescription.textContent = selectedOutfit.description;
        clearOutfitTable(outfitsTable);
        addOutfitDataToTable(outfitsTable, outfits[currentOutfitPage].items, currentOutfitPage, 3, 150, 150);
    }
}

function nextModalPage(pageNum, mode) {
    console.log(mode);
    if (currentModalPage < pagedData.length - 1) {
        currentModalPage += pageNum;
        clearTable(mode === 'create' ? selectedModalTable : selectedEditModalTable);
        addOutfitDataToModalTable(selectedModalTable, pagedData, currentModalPage, false, 3, mode);
    }
}

function prevModalPage(pageNum, mode) {
    console.log(mode);
    if (currentModalPage > 0) {
        currentModalPage -= pageNum;
        clearTable(mode === 'create' ? selectedModalTable : selectedEditModalTable);
        addOutfitDataToModalTable(selectedModalTable, pagedData, currentModalPage, false, 3, mode);
    }
}

function nextEditModalPage(pageNum, mode) {
    console.log(mode);
    if (currentEditModalPage < pagedData.length - 1) {
        currentEditModalPage += pageNum;
        clearTable(selectedEditModalTable);
        addOutfitDataToModalTable(selectedEditModalTable, pagedData, currentEditModalPage, false, 3, mode);
    }
}

function prevEditModalPage(pageNum, mode) {
    console.log(mode);
    if (currentEditModalPage > 0) {
        currentEditModalPage -= pageNum;
        clearTable(selectedEditModalTable);
        addOutfitDataToModalTable(selectedEditModalTable, pagedData, currentEditModalPage, false, 3, mode);
    }
}

function selectItemModal(cell, mode) {
    console.log("------------SELECT ITEM MODAL--------------");
    console.log("Modal Items before push: ", modalItems);
    console.log("Item Index: ", getItemIndex(cell, mode));
    console.log("Current Modal Page: ", currentModalPage);

    if(modalItems.length < 6) {
        modalItems.push(pagedData[mode === 'create' ? currentModalPage : currentEditModalPage][getItemIndex(cell, mode)]);
    } else {
        openCBox('tooManyItemsWarningCBox');
    }
    console.log("Modal Items after push: ", modalItems);

    if(mode === 'create') {
        console.log("Select Item Create");
        addOutfitDataToModalSelectionTable(modalSelectionTable, modalItems,  6, 75, 75, mode);
    } else {
        console.log("Select Item Edit");
        addOutfitDataToModalSelectionTable(modalEditSelectionTable, modalItems, 6, 75, 75, mode);
    }

    // If there's a selected cell, hide its buttons
    if (currentModalCell) {
        currentModalCell.classList.remove('selected');
    }

    // Select the clicked cell and show its buttons
    cell.classList.add('selected');
    currentModalCell = cell;
}

function removeSelectedItem(cell, mode) {
    console.log("REMOVE SELECTED CALLED");
    if(mode === 'create') {
        modalItems.splice(cell.cellIndex, 1);
        clearOutfitTable(modalSelectionTable);
        addOutfitDataToModalSelectionTable(modalSelectionTable, modalItems, 6, 75, 75, mode);
    } else {
        selectedOutfit.items.splice(cell.cellIndex, 1);
        clearOutfitTable(modalEditSelectionTable);
        addOutfitDataToModalSelectionTable(modalEditSelectionTable, selectedOutfit.items, 6, 75, 75, mode);
    }
}

function openCreateOutfitModal() {

    setModalPaginationVariables();
    selectedModalTable = document.getElementById('modal-tops-create-table');

    if(currentModalPage > 0) {
        prevModalPage(currentModalPage);
        currentModalPage -= currentModalPage;
    }
    loadModalButtons();
    clearOutfitTable(modalSelectionTable);
    openModal('outfitCreateModal');
}

function openEditOutfitModal() {

    setEditModalPaginationVariables();
    selectedEditModalTable = document.getElementById('modal-tops-edit-table');

    let outfitTitle = document.querySelector('#outfit-edit-title');
    outfitTitle.value = selectedOutfit.name;

    let outfitDescription = document.querySelector('#outfit-edit-description');
    outfitDescription.value = selectedOutfit.description;

    if(currentEditModalPage > 0) {
        prevModalPage(currentEditModalPage);
        currentEditModalPage -= currentEditModalPage;
    }
    loadModalButtons();
    console.log(selectedOutfit.items);
    modalItems = selectedOutfit.items;
    addOutfitDataToModalSelectionTable(modalEditSelectionTable, modalItems, 6, 75, 75, 'edit');
    openModal('outfitEditModal');
}

function createNewOutfit() {

    if(modalItems.length > 0) {
        let outfitDescription = document.querySelector('#outfit-create-description');
        let outfitTitle = document.querySelector('#outfit-create-title');
        var newModalItems = Array.from(modalItems);
        var newOutfit = new Outfit(outfitTitle.value, outfitDescription.value, newModalItems);

        outfits.push(newOutfit);
        modalItems.splice(0, modalItems.length);

        addOutfitDataToTable(outfitsTable, outfits, currentOutfitPage, 3, 150, 150);
        closeModal();
    } else {
        openCBox('NoItemsCBox');
    }
}

function editOutfit() {

    if(selectedOutfit.items.length > 0) {
        let outfitDescription = document.querySelector('#outfit-edit-description');
        let outfitTitle = document.querySelector('#outfit-edit-title');

        var index = outfits.indexOf(selectedOutfit);
        var newModalItems = Array.from(modalItems);
        selectedOutfit.name = outfitTitle.value;
        selectedOutfit.description = outfitDescription.value;
        selectedOutfit.items = newModalItems;
        outfits[index] = selectedOutfit;

        modalItems.splice(0, modalItems.length);

        clearOutfitTable(outfitsTable);
        addOutfitDataToTable(outfitsTable, outfits, currentOutfitPage, 3, 150, 150);
        closeModal();
        closeCBox();
    } else {
        closeCBox();
        openCBox('NoItemsCBox');
    }
}

function deleteOutfit() {

    outfits.splice(currentOutfitPage, 1);
    clearOutfitTable(outfitsTable);
    currentOutfitPage === 0 ? ++currentOutfitPage : --currentOutfitPage;

    let outfitTitle = document.querySelector('#outfit-title');
    outfitTitle.textContent = outfits[currentOutfitPage].name;

    let outfitDescription = document.querySelector('#outfit-description');
    outfitDescription.textContent = outfits[currentOutfitPage].description;

    addOutfitDataToTable(outfitsTable, outfits[currentOutfitPage].items, currentOutfitPage, 3, 150, 150);
    closeCBox();
}

function openPostOutfitModal() {

    let outfitTitle = document.querySelector('#outfit-post-title');
    outfitTitle.textContent = selectedOutfit.name;

    let outfitDescription = document.querySelector('#outfit-post-description');
    outfitDescription.textContent = selectedOutfit.description;

    let postOutfitTable = document.querySelector('.post-outfit-display');
    clearTable(postOutfitTable);
    addOutfitDataToTable(postOutfitTable, outfits[currentOutfitPage].items, currentOutfitPage, 3, 150, 150);
    openModal('postOutfitModal');
}

function getItemIndex(cell, mode) {
    let rowIndex = cell.parentNode.rowIndex * 2;
    let cellIndex = cell.cellIndex;

    if(cell.parentNode.rowIndex == 0) cellIndex--;
    if(cell.parentNode.rowIndex == 2) cellIndex++;

    return rowIndex + cellIndex;
}

function iterateThroughOutfits() {

    if(outfitIndex < outfits.length - 1) {
        outfitIndex++;
    } else {
        outfitIndex = 0;
    }

    postSocialOutfitTitle.textContent = outfits[outfitIndex].name;
    postSocialOutfitDescription.textContent = outfits[outfitIndex].description;
    clearTable(postOutfitTable);
    addOutfitDataToTable(postOutfitTable, outfits[outfitIndex].items, currentOutfitPage, 3, 150, 150);
}
