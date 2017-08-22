function setCookie(obj) {		
  var d = new Date();
  d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  var val = JSON.stringify(obj);
  document.cookie = "key=" + val + ";" + expires + ";path=/";
}

function getCookie() {
  var name = "key=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return JSON.parse(c.substring(name.length, c.length));
      }
  }
  return {};
}

var cookieKeys = ['glitches', 'mode', 'logic', 'goal', 'goModeRequirements', 'shouldUseKeybind', 'keybindCode'];
var cookieDefault = {
  glitches: {
    fakeflippers: true,
    ipbj: true,
    bunnyrevival: false,
    owbunnyrevival: false,
    superbunny: false,
    surfbunny: false,
    hover: false,
    walkonwater: false,
    darkrooms: {
      eastern: true,
      agatower: false,
      oldMan: true,
      pod: true,
      mire: true,
      tr: true,
      sewers: false
    }  
  },
  mode: 'standard',
  logic: 'nmg',
  goal: 'ganon',
  goModeRequirements: {
    mastersword: true,
    temperedsword: false,
    silverarrows: false,
    somaria: false,
    firerod: false,
    boots: false
  },
  shouldUseKeybind: false,
  keybindCode: 'Numpad1'
}

var cookieLock = false;
function loadCookie() {
  if (cookieLock) {
    return;
  }
  cookieLock = true;

  var cookieObj = getCookie();

  cookieKeys.forEach(function (key) {
    if (cookieObj[key] === undefined) {
      cookieObj[key] = cookieDefault[key];
    }
  });

  Object.keys(glitches).forEach(function(eachGlitch) {
    glitches[eachGlitch] = cookieObj.glitches[eachGlitch];
  });

  Object.keys(cookieObj.goModeRequirements).forEach(function(eachGoMode) {
    goModeRequirements[eachGoMode] = cookieObj.goModeRequirements[eachGoMode];
  });

  minorGlitchesCheckboxes.forEach(function(checkbox) {
    checkbox.checked = glitches[checkbox.id];
  });
  darkRoomsCheckboxes.forEach(function(checkbox) {
    checkbox.checked = glitches.darkrooms[checkbox.id];
  });
  gomodeCheckboxes.forEach(function(checkbox) {
    checkbox.checked = goModeRequirements[checkbox.id];
  });

  shouldUseKeybind = cookieObj.shouldUseKeybind;
  keybindCode = cookieObj.keybindCode;
  splitCheckbox.checked = shouldUseKeybind;
  keybindButton.disabled = !shouldUseKeybind;

  mode = cookieObj.mode;
  logic = cookieObj.logic;
  goal = cookieObj.goal;

  var fn = function(select, option) {
    var opts = select.options;
    for (var opt, i=0; opt = opts[i]; i++) {
      if (opt.value === option) {
        select.selectedIndex = i;
        break;
      }
    }
  }
  fn(modeSelect, mode);
  fn(goalSelect, goal);
  //fn(logicSelect, logic);

  resetItems();
  resetChests();
  resetLog();

  cookieLock = false;
}
function saveCookie() {
  if (cookieLock) {
    return;
  }
  cookieLock = true;

  var cookieObj = {};

  cookieObj.glitches = {};
  Object.keys(glitches).forEach(function(eachGlitch) {
    cookieObj.glitches[eachGlitch] = glitches[eachGlitch];
  });
  cookieObj.logic = logic;
  cookieObj.mode = mode;
  cookieObj.goal = goal;
  cookieObj.goModeRequirements = goModeRequirements;
  cookieObj.shouldUseKeybind = shouldUseKeybind;
  cookieObj.keybindCode = keybindCode;

  setCookie(cookieObj);

  cookieLock = false;
}	
loadCookie();
saveCookie();