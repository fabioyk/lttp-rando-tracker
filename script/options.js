var optionsOpen = false;
var minorGlitchesCheckboxes = document.querySelectorAll('#minor-glitches-list input');
var darkRoomsCheckboxes = document.querySelectorAll('#dark-rooms-list input');
var gomodeCheckboxes = document.querySelectorAll('#go-mode-restrictions input');
var splitCheckbox = document.querySelector('#splitcheckbox');
var modeSelect = document.querySelector('#mode_select');
var logicSelect = document.querySelector('#logic_select');
var goalSelect = document.querySelector('#goal_select');
var keybindButton = document.querySelector('#keybind_button');

minorGlitchesCheckboxes.forEach(function(checkbox) {
  checkbox.checked = glitches[checkbox.id];
  checkbox.addEventListener('click', function() {
    glitches[checkbox.id] = checkbox.checked;
    saveCookie();
    toggle();
  });
});

darkRoomsCheckboxes.forEach(function(checkbox) {
  checkbox.checked = glitches.darkrooms[checkbox.id];
  checkbox.addEventListener('click', function() {
    glitches.darkrooms[checkbox.id] = checkbox.checked;
    saveCookie();
    toggle();
  });
});

gomodeCheckboxes.forEach(function(checkbox) {
  checkbox.checked = goModeRequirements[checkbox.id];
  checkbox.addEventListener('click', function() {
    goModeRequirements[checkbox.id] = checkbox.checked;
    saveCookie();
    toggle();
  });
});

document.querySelector('#options_button').addEventListener('click', function() {
  optionsOpen = !optionsOpen;
  if (optionsOpen) {
    document.querySelector('#options').style.display = "inherit";
  } else {
    document.querySelector('#options').style.display = "none";
  }		
});

modeSelect.addEventListener('change', function() {
  mode = modeSelect.value;
  resetChests();
  resetItems();
  saveCookie();
  toggle();
  resetLog();
  refreshAll();
});

/*
logicSelect.addEventListener('change', function() {
  logic = logicSelect.value;
  saveCookie();
  toggle();
});
*/

goalSelect.addEventListener('change', function() {
  goal = goalSelect.value;
  if (goal === 'keysanity') {
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
    prizes[i] = (goal === "keysanity" ? 0 : 1);
  }
  
  saveCookie();
  toggle();
  refreshAll();
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