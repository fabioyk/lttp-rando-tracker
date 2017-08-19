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
  console.log('we changing mode ',modeSelect.value);
  mode = modeSelect.value;
  resetChests();
  resetItems();
  saveCookie();
  toggle();
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
  saveCookie();
  toggle();
  console.log('changed to',goal);
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
    console.log(evt.code);
    deactivateKeybindMode();
  }  
}