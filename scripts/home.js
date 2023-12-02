const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dates = ['Nov. 26, 2023', 'Nov. 27, 2023', 'Nov. 28, 2023', 'Nov. 29, 2023', 'Nov. 30, 2023', 'Dec. 1, 2023', 'Dec. 2, 2023'];
const temps = ['-12°C', '-11°C', '-13°C', '-9°C', '-4°C', '-16°C', '-5°C'];
let outfitIndexHome = 0;
let outfitDay = 0;
let homePageOutfitTable = document.querySelector('.outfit-display-homepage');
let homePageOutfitEditBtn = document.querySelector('#home-edit-outfit');
let homePageOutfitTitle = document.querySelector('#home-outfit-header');
let outfitsPerDay = [outfit1, outfit3, outfit2, outfit1, outfit3, outfit2, outfit3];
let buttonsDisabled = true;
let mySelectedOutfit;

let squareSun = document.querySelector('.squareSun');
let squareMon = document.querySelector('.squareMon');
let squareTues = document.querySelector('.squareTues');
let squareWed = document.querySelector('.squareWed');
let squareThurs = document.querySelector('.squareThurs');
let squareFri = document.querySelector('.squareFri');
let squareSat = document.querySelector('.squareSat');

let squares = [squareSun, squareMon, squareTues, squareWed, squareThurs, squareFri, squareSat];

function dayClicked(day, date, outfit){
    document.getElementById('dayText').innerText = days[day];
    document.getElementById('dateText').innerText = dates[date];
    document.getElementById('tempText').innerText = temps[date];

    mySelectedOutfit = outfitsPerDay[day];
    outfitDay = day;
    homePageOutfitTitle.textContent = outfitsPerDay[outfitDay].name;
    loadHomeOutfitButtons();
    addOutfitDataToTable(homePageOutfitTable, outfitsPerDay[outfitDay].items, outfitIndexHome, 3, 75, 75);
    openModal("homeDayModal");
}

function toggleEditing() {
    if(buttonsDisabled) {
        homePageOutfitEditBtn.innerHTML =
            `<i class="fa-solid fa-check"></i>`;
        buttonsDisabled = false;
    } else {
        outfitsPerDay[outfitDay] = outfits[outfitIndexHome];
        homePageOutfitTitle.textContent = outfits[outfitIndexHome].name;
        homePageOutfitEditBtn.innerHTML =
            `<i class="fa-solid fa-pen-to-square"></i>`;
        buttonsDisabled = true;
        updateHomeSquare(outfitDay, mySelectedOutfit);
    }
    loadHomeOutfitButtons();
}

function loadHomeOutfitButtons() {
    console.log(buttonsDisabled);
    document.getElementById('home-outfit-next').disabled = buttonsDisabled;
    document.getElementById('home-outfit-next').onclick = function() {
        nextHomeOutfitPage(1);
    };

    document.getElementById('home-outfit-prev').disabled = buttonsDisabled;
    document.getElementById('home-outfit-prev').onclick = function() {
        prevHomeOutfitPage(1);
    };
}

function nextHomeOutfitPage(pageNum) {
    if (outfitIndexHome < outfits.length - 1) {
        outfitIndexHome += pageNum;
        mySelectedOutfit = outfits[outfitIndexHome];
        homePageOutfitTitle.textContent = outfits[outfitIndexHome].name;
        clearOutfitTable(homePageOutfitTable);
        addOutfitDataToTable(homePageOutfitTable, mySelectedOutfit.items, outfitIndexHome, 3, 75, 75);
    }
}

function prevHomeOutfitPage(pageNum) {
    if (outfitIndexHome > 0) {
        outfitIndexHome -= pageNum;
        mySelectedOutfit = outfits[outfitIndexHome];
        homePageOutfitTitle.textContent = outfits[outfitIndexHome].name;
        clearOutfitTable(homePageOutfitTable);
        addOutfitDataToTable(homePageOutfitTable, mySelectedOutfit.items, outfitIndexHome, 3, 75, 75);
    }
}

function updateHomeSquare(chosenDay, chosenOutfit) {
    clearOutfitTable(squares[chosenDay]);
    addOutfitDataToTable(squares[chosenDay], chosenOutfit.items, 0, 3, 50, 50);
}

for (let i=0;i<7;i++){
    updateHomeSquare(i, outfitsPerDay[i]);
}