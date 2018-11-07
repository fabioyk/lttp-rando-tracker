// function setCookie(obj) {		
//   var d = new Date();
//   d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
//   var expires = "expires="+d.toUTCString();
//   var val = JSON.stringify(obj);
//   document.cookie = "key=" + val + ";" + expires + ";path=/";
// }

// function getCookie() {
//   var name = "key=";
//   var ca = document.cookie.split(';');
//   for(var i = 0; i < ca.length; i++) {
//       var c = ca[i];
//       while (c.charAt(0) == ' ') {
//           c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//           return JSON.parse(c.substring(name.length, c.length));
//       }
//   }
//   return {};
// }

var cookieKeys = ['mode', 'swords', 'variation', 'goal', 'shouldUseKeybind', 'keybindCode'];
var cookieDefault = {
  mode: 'standard',
  variation: 'none',
  swords: 'normal',
  goal: 'ganon',
  shouldUseKeybind: false,
  keybindCode: 'Numpad1'
}

var cookieLock = false;
function loadCookie() {
  if (cookieLock) {
    return;
  }
  cookieLock = true;


  cookieKeys.forEach(function (key) {
    if (localStorage.getItem(key) === undefined || localStorage.getItem(key) === null) {
      if (typeof cookieDefault[key] === 'object') {
        localStorage.setItem(key, JSON.stringify(cookieDefault[key]));
      } else {
        localStorage.setItem(key, cookieDefault[key]);
      }      
    }
  });

  shouldUseKeybind = localStorage.getItem('shouldUseKeybind');
  keybindCode = localStorage.getItem('keybindCode');
  splitCheckbox.checked = shouldUseKeybind;
  keybindButton.disabled = !shouldUseKeybind;

  mode = localStorage.getItem('mode');
  variation = localStorage.getItem('variation');
  goal = localStorage.getItem('goal');
  swords = localStorage.getItem('swords');

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
  fn(varSelect, variation);
  fn(swordsSelect, swords);

  resetItems();
  resetChests();
  resetLog();
  refreshAll();

  cookieLock = false;
}
function saveCookie() {
  if (cookieLock) {
    return;
  }
  cookieLock = true;

  localStorage.setItem('variation', variation);
  localStorage.setItem('goal', goal);
  localStorage.setItem('mode', mode);
  localStorage.setItem('swords', swords);
  localStorage.setItem('shouldUseKeybind', shouldUseKeybind);
  localStorage.setItem('keybindCode', keybindCode);


  cookieLock = false;
}	
loadCookie();
saveCookie();