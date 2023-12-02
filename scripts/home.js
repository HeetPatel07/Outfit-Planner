const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const temps = ['-12°C', '-11°C', '-13°C', '-9°C', '-4°C', '-16°C', '-5°C', ];
let outfitIndexHome = 0;
let outfitDay = 0;
let homePageOutfitTable = document.querySelector('.outfit-display-homepage');
let homePageOutfitEditBtn = document.querySelector('#home-edit-outfit');
let homePageOutfitTitle = document.querySelector('#home-outfit-header');
let outfitsPerDay = [outfit1, outfit3, outfit2, outfit1, outfit3, outfit2, outfit3];
let buttonsDisabled = true;


function dayClicked(day, date, outfit){
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
        selectedOutfit = outfits[outfitIndexHome];
        homePageOutfitTitle.textContent = outfits[outfitIndexHome].name;
        clearOutfitTable(homePageOutfitTable);
        addOutfitDataToTable(homePageOutfitTable, selectedOutfit.items, outfitIndexHome, 3, 75, 75);
    }
}

function prevHomeOutfitPage(pageNum) {
    if (outfitIndexHome > 0) {
        outfitIndexHome -= pageNum;
        selectedOutfit = outfits[outfitIndexHome];
        homePageOutfitTitle.textContent = outfits[outfitIndexHome].name;
        clearOutfitTable(homePageOutfitTable);
        addOutfitDataToTable(homePageOutfitTable, selectedOutfit.items, outfitIndexHome, 3, 75, 75);
    }
}