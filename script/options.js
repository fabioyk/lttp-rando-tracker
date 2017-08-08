var optionsOpen = false;
var minorGlitchesCheckboxes = document.querySelectorAll('#minor-glitches-list input');
var darkRoomsCheckboxes = document.querySelectorAll('#dark-rooms-list input');
var gomodeCheckboxes = document.querySelectorAll('#go-mode-restrictions input');
var modeSelect = document.querySelector('#mode_select');
var logicSelect = document.querySelector('#logic_select');

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
  saveCookie();
  toggle();
});

logicSelect.addEventListener('change', function() {
  logic = logicSelect.value;
  saveCookie();
  toggle();
});