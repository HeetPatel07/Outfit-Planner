let currentOutfit = 0;
let currentOutfitPage = 0;

loadOutfitButtons();

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
console.log(outfitsTable);
addOutfitDataToTable(outfitsTable, outfits[currentOutfit].items, 0, 3);

function addOutfitDataToTable(table, data, pageNumber, columns) {
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
                cell.innerHTML = `<img src="${item.image}" width='150px' height='150px'>`
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
        addOutfitDataToTable(outfitsTable, outfits[currentOutfitPage].items, currentOutfitPage, 3);
    }
}

function prevOutfitPage(pageNum) {
    if (currentOutfitPage > 0) {
        currentOutfitPage -= pageNum;
        clearOutfitTable(outfitsTable);
        addOutfitDataToTable(outfitsTable, outfits[currentOutfitPage].items, currentOutfitPage, 3);
    }
}