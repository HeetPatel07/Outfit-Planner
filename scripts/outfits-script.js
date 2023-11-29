let currentOutfit = 0;
let currentOutfitPage = 0;
let categoriesModal = document.querySelectorAll('.category-modal');
let tablesModal = document.querySelectorAll('.table-modal');
let modalItems = [];

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

outfits = [outfit1, outfit2, outfit3];
var outfitsTable = document.querySelector('.outfit-display tbody');
addOutfitDataToTable(outfitsTable, outfits[currentOutfit].items, 0, 3, 150, 150);

var othersTableModal = document.querySelector('#modal-others-table tbody');
addOutfitDataToModalTable(othersTableModal, pagedothers, 0, false, 3);

var topsTableModal = document.querySelector('#modal-tops-table tbody');
addOutfitDataToModalTable(topsTableModal, pagedTops, 0, false, 3);

var bottomsTableModal = document.querySelector('#modal-bottoms-table tbody');
addOutfitDataToModalTable(bottomsTableModal, pagedBottoms, 0, false,  3);

var shoesTableModal = document.querySelector('#modal-shoes-table tbody');
addOutfitDataToModalTable(shoesTableModal, pagedShoes, 0, false,  3);

var modalSelectionTable = document.querySelector('#active-box tbody');

function addOutfitDataToTable(table, data, pageNumber, columns, width, height) {
    console.log(data);
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

function addOutfitDataToModalTable(table, data, pageNumber, filtered, columns) {

    let pageItems;
    if(!filtered) {
        pageItems = data[pageNumber];
    } else {
        pageItems = data;
    }
    console.log(pageItems);
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
                    selectItemModal(this);
                };
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
        clearOutfitTable(outfitsTable);
        addOutfitDataToTable(outfitsTable, outfits[currentOutfitPage].items, currentOutfitPage, 3, 150, 150);
    }
}

function prevOutfitPage(pageNum) {
    if (currentOutfitPage > 0) {
        currentOutfitPage -= pageNum;
        clearOutfitTable(outfitsTable);
        addOutfitDataToTable(outfitsTable, outfits[currentOutfitPage].items, currentOutfitPage, 3, 150, 150);
    }
}

function selectItemModal(cell) {
    // If the clicked cell is already the selected cell, deselect it
    if (cell === currentCell) {
        cell.classList.remove('selected');
        currentCell = null;
        return;
    }

    console.log("Cell's index in array: ", getItemIndex(cell));
    console.log(pagedData[currentOutfitPage]);
    console.log(pagedData[currentOutfitPage][getItemIndex(cell)]);

    modalItems.push(pagedData[currentOutfitPage][getItemIndex(cell)]);
    addOutfitDataToTable(modalSelectionTable, modalItems, 0, 6, 75, 75);

    // If there's a selected cell, hide its buttons
    if (currentCell) {
        currentCell.classList.remove('selected');
    }

    // Select the clicked cell and show its buttons
    cell.classList.add('selected');
    currentCell = cell;
}

function createNewOutfit() {
    newOutfit = new Outfit("Outfit " + outfits.length, "Description", modalItems);

    outfits.push(newOutfit);
    addOutfitDataToTable(outfitsTable, outfits, currentOutfitPage, 3, 150, 150);
}

function getItemIndex(cell) {
    let rowIndex = cell.parentNode.rowIndex * 2;
    let cellIndex = cell.cellIndex;

    if(cell.parentNode.rowIndex == 0) cellIndex--;
    if(cell.parentNode.rowIndex == 2) cellIndex++;

    return rowIndex + cellIndex + (currentPage * 9);
}
