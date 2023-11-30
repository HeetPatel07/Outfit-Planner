let currentOutfit = 0;
let currentOutfitPage = 0;
let currentModalPage = 0;
let categoriesModal = document.querySelectorAll('.category-modal');
let categoriesEditModal = document.querySelectorAll('.category-edit-modal');
let tablesModal = document.querySelectorAll('.table-modal');
let tablesEditModal = document.querySelectorAll('.table-edit-modal');
let modalItems = [];
let currentModalCell;

loadOutfitButtons();

categoriesModal.forEach(function(category) {
    category.addEventListener('click', function() {
        categoriesModal.forEach(function(c) {
            c.classList.remove('selected');
        });
        this.classList.add('selected');

        // Hide all tables
        tablesModal.forEach(function(table) {
            console.log(table);
            table.style.display = 'none';
        });

        // Show the table corresponding to the selected category
        selectedCategory = this.getAttribute('data-category');
        let selectedTable = document.querySelector('.' + selectedCategory + '-modal');
        console.log(selectedTable);
        selectedTable.style.display = 'block';
        currentPage = 0;

        loadButtons();
        togglePaginationBtnsDisabled();
    });
});

categoriesEditModal.forEach(function(category) {
    category.addEventListener('click', function() {
        categoriesEditModal.forEach(function(c) {
            c.classList.remove('selected');
        });
        this.classList.add('selected');

        console.log(tablesEditModal);
        // Hide all tables
        tablesEditModal.forEach(function(table) {
            table.style.display = 'none';
        });

        // Show the table corresponding to the selected category
        selectedCategory = this.getAttribute('data-category');
        let selectedTable = document.querySelector('.' + selectedCategory + '-edit-modal');
        console.log(selectedTable);
        selectedTable.style.display = 'block';
        currentModalPage = 0;

        loadModalButtons();
        togglePaginationBtnsDisabled();
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

var modalSelectionTable = document.querySelector('#active-create-box tbody');
var modalEditSelectionTable = document.querySelector('#active-edit-box tbody');
let selectedOutfit = outfits[currentOutfitPage];

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
                removeBtn.onclick = function () {
                    removeSelectedItem(cell, mode);
                }

                deleteItemDiv.appendChild(removeBtn);
                cell.appendChild(deleteItemDiv);
            }
        }
    });
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

    document.getElementById('modal-' + selectedCategory + '-create-next').onclick = function() {
        nextModalPage(1, 'create');
    };

    document.getElementById('modal-' + selectedCategory + '-create-prev').onclick = function() {
        prevModalPage(1, 'create');
    };

    document.getElementById('modal-' + selectedCategory + '-edit-next').onclick = function() {
        nextModalPage(1, 'edit');
    };

    document.getElementById('modal-' + selectedCategory + '-edit-prev').onclick = function() {
        prevModalPage(1, 'edit');
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
        clearOutfitTable(outfitsTable);
        addOutfitDataToTable(outfitsTable, outfits[currentOutfitPage].items, currentOutfitPage, 3, 150, 150);
    }
}

function prevOutfitPage(pageNum) {
    if (currentOutfitPage > 0) {
        currentOutfitPage -= pageNum;
        selectedOutfit = outfits[currentOutfitPage];
        clearOutfitTable(outfitsTable);
        addOutfitDataToTable(outfitsTable, outfits[currentOutfitPage].items, currentOutfitPage, 3, 150, 150);
    }
}

function nextModalPage(pageNum, mode) {
    if (currentModalPage < pagedData.length - 1) {
        console.log("Modal Page before next: ", currentModalPage);
        currentModalPage += pageNum;
        console.log("Modal Page after next: ", currentModalPage);
        clearTable(selectedTable);
        addOutfitDataToModalTable(selectedTable, pagedData, currentModalPage, false, 3, mode);
    }
}

function prevModalPage(pageNum, mode) {
    if (currentModalPage > 0) {
        console.log("PREV PAGE INIT");
        currentModalPage -= pageNum;
        clearTable(selectedTable);
        addOutfitDataToModalTable(selectedTable, pagedData, currentModalPage, false, 3, mode);
    }
}

function selectItemModal(cell, mode) {

    if(modalItems.length < 6) {
        modalItems.push(pagedData[currentModalPage][getItemIndex(cell)]);
    } else {
        openCBox('tooManyItemsWarningCBox');
    }

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
    selectedTable = document.getElementById('modal-tops-create-table');
    if(currentModalPage > 0) {
        prevModalPage(currentModalPage);
        currentModalPage -= currentModalPage;
    }
    loadModalButtons();
    modalItems.splice(0, modalItems.length);
    clearOutfitTable(modalSelectionTable);
    openModal('outfitCreateModal');
}

function openEditOutfitModal() {
    selectedTable = document.getElementById('modal-tops-edit-table');
    if(currentModalPage > 0) {
        prevModalPage(currentModalPage);
        currentModalPage -= currentModalPage;
    }
    loadModalButtons();
    console.log(selectedOutfit.items);
    modalItems.splice(0, modalItems.length);
    modalItems = selectedOutfit.items;
    addOutfitDataToModalSelectionTable(modalEditSelectionTable, modalItems, 6, 75, 75, 'edit');
    openModal('outfitEditModal');
}

function createNewOutfit() {

    var newModalItems = Array.from(modalItems);
    var newOutfit = new Outfit("Outfit " + (outfits.length + 1), "Description", newModalItems);

    outfits.push(newOutfit);

    addOutfitDataToTable(outfitsTable, outfits, currentOutfitPage, 3, 150, 150);
    closeModal();
}

function editOutfit() {

    var index = outfits.indexOf(selectedOutfit);
    var newModalItems = Array.from(modalItems);
    selectedOutfit.items = newModalItems;
    outfits[index] = selectedOutfit;

    clearOutfitTable(outfitsTable);
    addOutfitDataToTable(outfitsTable, outfits, currentOutfitPage, 3, 150, 150);
    closeModal();
}

function getItemIndex(cell) {
    let rowIndex = cell.parentNode.rowIndex * 2;
    let cellIndex = cell.cellIndex;

    if(cell.parentNode.rowIndex == 0) cellIndex--;
    if(cell.parentNode.rowIndex == 2) cellIndex++;

    return rowIndex + cellIndex + (currentPage * 9);
}
