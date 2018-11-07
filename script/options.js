var optionsOpen = false;
var splitCheckbox = document.querySelector('#splitcheckbox');
var modeSelect = document.querySelector('#mode_select');
var goalSelect = document.querySelector('#goal_select');
var varSelect = document.querySelector('#var_select');
var swordsSelect = document.querySelector('#swords_select');
var keybindButton = document.querySelector('#keybind_button');
var hintArea = document.querySelector('#hint-tracker');

var storedHints = [];
var hintsTextLimit = 120;
document.querySelector('#options_button').addEventListener('click', function() {
  optionsOpen = !optionsOpen;
  if (optionsOpen) {
    document.querySelector('#options').style.display = "inherit";
  } else {
    document.querySelector('#options').style.display = "none";
    updateHintsTextTicker();
    document.getElementById("caption").innerHTML = hintsText;    
    if (hintsText.length > hintsTextLimit) {
      document.getElementById("caption").className = 'scroll-this';
    }	
    hintsTextOn = true;
    
  }		
});

document.querySelector('#new_hint_button').addEventListener('click', function() {
  storedHints.push([itemsArr[0], locationsArr[0]]);
  hintArea.appendChild(makeHintSelector(storedHints.length-1));
  updateHintsSelector();
  updateHintsTextTicker();
});

function updateHintsSelector() {
  hintArea.childNodes.forEach((child, i) => {
    if (!storedHints[child.id.split('-')[1]]) {
      hintArea.removeChild(child);
    }
  });
}

var hintsText = '&nbsp;';
var hintsTextOn = true;
function updateHintsTextTicker() {
  hintsText = '';
  storedHints.forEach(eachHint => {    
    if (eachHint) {
      if (hintsText != '') {
        hintsText += '  |  ';
      }
      hintsText += eachHint[0] + ' &#8594; ' + eachHint[1];
    }
  });
  if (hintsText == '') {
    hintsText = '&nbsp;';
  }  
}

var itemsArr = 
  ['Unique Item', 'Useless', 'Mildly Useful', 'Bow', 'Silvers', 'Hookshot',
  'Mushroom', 'Powder', 'Fire Rod', 'Ice Rod', 'Bombos', 'Ether', 'Quake',
  'Lamp', 'Hammer', 'Shovel', 'Flute', 'Bug Net', 'Book', 'Bottle',
  'Cane of Somaria', 'Cane of Byrna', 'Cape', 'Mirror', 'Boots', 'Glove',
  'Flippers', 'Sword', 'Moon Pearl'];
var keysanityItemsArr = 
  ['GT BK', 'GT sk', 'EP BK', 'DP BK', 'DP sk', 'ToH BK', 'ToH sk', 'PoD BK', 'PoD sk', 'SP BK', 'SP sk',
  'SW BK', 'SW sk', 'TT BK', 'TT sk', 'IP BK', 'IP sk', 'MM BK', 'MM sk', 'TR BK', 'TR sk'];
var triforceItem = 'Triforce Piece';
var retroItem = 'Key';

var locationsArr =
  ['Held by NPC', 'Plain Sight', 'Tablet', 'Village of Outcasts', 'Under Water',
  'In the Dark', 'Catfish/Zora', 'Lost Woods', 'Great Fairy',  
  'Requires Bomb', 'Requires Hammer', 'Requires Glove', 'Requires Bow',
  'Requires Somaria', 'Requires Hookshot', 'Requires Boots', 'on a Boss', 
  'Swamp Left Side', 'Swamp Big Chest', 'Mire Fire Locked', 'Hera Basement',
  'in Hyrule Castle', 'in Eastern', 'in Desert', 'in Hera', 'in Aga Tower', 'in PoD', 
  'in Swamp', 'in Skull Woods', 'in Thieves Town', 'in Ice Palace', 'in Mire', 
  'in Turtle Rock', 'in Ganons Tower']

function makeHintSelector(id) {
  let hintObj = document.createElement('div');
  hintObj.id = 'selector-'+id;

  let hintItem = document.createElement('select');
  hintItem.name = 'item' + id;
  hintItem.className = 'item-select';
  hintItem.id = 'item' + id;
  itemsArr.forEach(eachItem => {
    let option = document.createElement('option');
    option.value = eachItem;
    option.innerText = eachItem;
    hintItem.appendChild(option);
  });
  if (variation === 'keysanity') {
    keysanityItemsArr.forEach(eachItem => {
      let option = document.createElement('option');
      option.value = eachItem;
      option.innerText = eachItem;
      hintItem.appendChild(option);
    });
  }
  if (variation === 'retro') {
    let option = document.createElement('option');
    option.value = retroItem;
    option.innerText = retroItem;
    hintItem.appendChild(option);
  }
  if (goal === 'triforce') {
    let option = document.createElement('option');
    option.value = triforceItem;
    option.innerText = triforceItem;
    hintItem.appendChild(option);
  }
  hintItem.addEventListener('change', function(ev) {
    storedHints[+ev.target.id.substr(4)][0] = ev.target.value;    
    updateHintsTextTicker()
  });
  hintObj.appendChild(hintItem);


  let hintPlace = document.createElement('select');
  hintPlace.name = 'place' + id;
  hintPlace.className = 'place-select';
  hintPlace.id = 'place' + id;
  locationsArr.forEach(eachLoc => {
    let option = document.createElement('option');
    option.value = eachLoc;
    option.innerText = eachLoc;
    hintPlace.appendChild(option);
  });
  hintPlace.addEventListener('change', function(ev) {
    storedHints[+ev.target.id.substr(5)][1] = ev.target.value;    
    updateHintsTextTicker()
  });
  hintObj.appendChild(hintPlace);

  let deleteButton = document.createElement('input');
  deleteButton.type = 'button';
  deleteButton.value = 'X';
  deleteButton.id = 'del' + id;
  deleteButton.addEventListener('click', function(ev) {
    storedHints[+ev.target.id.substr(3)] = null;
    updateHintsSelector();
    updateHintsTextTicker()
  })
  hintObj.appendChild(deleteButton);

  return hintObj;
}

function resetEverything() {
  highlightedChests = [];
  storedHints = [];
  hintArea.innerHTML = '';
  updateHintsSelector();
  updateHintsTextTicker();
  document.getElementById("caption").innerHTML = '';
  refreshHighlights();
  resetChests();
  resetItems();
  saveCookie();
  toggle();
  resetLog();
  refreshAll();
}

modeSelect.addEventListener('change', function() {
  mode = modeSelect.value;
  resetEverything();
});

swordsSelect.addEventListener('change', function() {
  swords = swordsSelect.value;
  resetEverything();
})

varSelect.addEventListener('change', function() {
  variation = varSelect.value;

  if (variation === 'keysanity') {
    itemsMax.chest0 = 6;
    itemsMax.chest1 = 6;
    itemsMax.chest2 = 6;
    itemsMax.chest3 = 14;
    itemsMax.chest4 = 10;
    itemsMax.chest5 = 8;
    itemsMax.chest6 = 8;
    itemsMax.chest7 = 8;
    itemsMax.chest8 = 8;
    itemsMax.chest9 = 12;
  } else if (variation === 'retro') {
    itemsMax.chest0 = 3;
    itemsMax.chest1 = 3;
    itemsMax.chest2 = 3;
    itemsMax.chest3 = 11;
    itemsMax.chest4 = 7;
    itemsMax.chest5 = 5;
    itemsMax.chest6 = 5;
    itemsMax.chest7 = 5;
    itemsMax.chest8 = 5;
    itemsMax.chest9 = 9;  
  } else {
    itemsMax.chest0 = 3;
    itemsMax.chest1 = 2;
    itemsMax.chest2 = 2;
    itemsMax.chest3 = 5;
    itemsMax.chest4 = 6;
    itemsMax.chest5 = 2;
    itemsMax.chest6 = 4;
    itemsMax.chest7 = 3;
    itemsMax.chest8 = 2;
    itemsMax.chest9 = 5;
  }
  
  items.chest0 = itemsMax.chest0;
  items.chest1 = itemsMax.chest1;
  items.chest2 = itemsMax.chest2;
  items.chest3 = itemsMax.chest3;
  items.chest4 = itemsMax.chest4;
  items.chest5 = itemsMax.chest5;
  items.chest6 = itemsMax.chest6;
  items.chest7 = itemsMax.chest7;
  items.chest8 = itemsMax.chest8;
  items.chest9 = itemsMax.chest9;

  for (var i=0; i<10; i++) {
    prizes[i] = (variation === "keysanity" ? 0 : 1);
  }
  resetEverything();
});

goalSelect.addEventListener('change', function() {
  goal = goalSelect.value;
  resetEverything();
});

var shouldUseKeybind = false;
splitCheckbox.addEventListener('click', function() {
  shouldUseKeybind = splitCheckbox.checked;
  keybindButton.disabled = !shouldUseKeybind;
  saveCookie();
});

var keybindMode = false;
keybindButton.addEventListener('click', function() {
  if (!keybindMode) {
    activateKeybindMode();
  } else {
    deactivateKeybindMode();
  }
});

function activateKeybindMode() {
  keybindMode = true;
  keybindButton.value = 'Cancel keybind';
  document.querySelector('#keybind_text').value = 'Press a key...';
  window.addEventListener('keypress', onBindButton);
}

function deactivateKeybindMode() {
  keybindMode = false;
  keybindButton.value = 'Bind new Button';
  document.querySelector('#keybind_text').value = keybindCode;
  window.removeEventListener('keypress', onBindButton);
}

function onBindButton(evt) {
  if (evt.code) {
    keybindCode = evt.code;
    deactivateKeybindMode();
  }  
}