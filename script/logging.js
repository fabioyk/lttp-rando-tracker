var currentLog = [];
var logData = {};

var keybindCode = 'Numpad1';

document.addEventListener('keypress', function(evt) {
  if (evt.code === keybindCode && !keybindMode && shouldUseKeybind) {
    if (!logData.startTime) {
      logData.startTime = Date.now();
    }
  }
})

function logAction(label, status) {
  if (label === 'tunic1') return;
  if (!logData.startTime && !shouldUseKeybind) {
    logData.startTime = Date.now();
  }
  if (label && logData.startTime && label !== 'go') {
    var index;
    for (var i = currentLog.length-1; i >= 0; i--) {
      if (currentLog[i].label === label) {
        index = i;
        break;
      }
    }

    if (label === 'triforce') {
      if (!logData.triforces) {
        logData.triforces = 1;
      } else {
        logData.triforces++;
      }
      currentLog.push({
        timestamp: Date.now(),
        status: logData.triforces,
        label: label
      })
    } else if (index !== undefined && status === false && label.indexOf('chest') === 0) {
      currentLog.splice(index, 1);
    } else if (index !== undefined && (Date.now() - currentLog[index].timestamp) < 10000) {  
      if (status === false) {
        currentLog.splice(index, 1);
      } else {
        currentLog[index].timestamp = Date.now();
        currentLog[index].status = status;
      }      
    } else {
      currentLog.push({
        timestamp: Date.now(),
        status: status,
        label: label
      });
    }
    
    document.querySelector('#log-text-area').value = processLog();
  }
}

function processLog() {
  var result = '';
  currentLog.forEach(function(line, index) {
    if (index > 0) {
      result += getSeparatorSymbol(currentLog[index-1].timestamp, line.timestamp);
    }
    result += '[' + convertTime(line.timestamp) + '] ' + translateLabel(line.label, line.status) + '\r\n';
  });
  return result;
}

function convertTime(timestamp) {
  var delta = timestamp - logData.startTime;
  delta = delta / 1000;
  var hours = Math.floor(delta / 3600);
  var mins = Math.floor((delta - hours * 3600) / 60);
  var secs = Math.floor(delta % 60);
  if (mins < 10) mins = '0' + mins;
  if (secs < 10) secs = '0' + secs;
  return hours + ':' + mins + ':' + secs;
}

function getSeparatorSymbol(timestamp1, timestamp2) {
  var delta = timestamp2 - timestamp1;
  if (delta < 30000) {
    return '';
  } else if (delta < 60000) {
    return '.\r\n';
  } else if (delta < 3 * 60000) {
    return ':\r\n';
  } else if (delta < 6 * 60000) {
    return '|\r\n';
  } else {
    return '|\r\n|\r\n';
  }
}

function translateLabel(label, value) {
  if (label.indexOf('location') === 0) {
    var chestNum = +label.substr(8);
    if (value) {
      return 'DID ' + chests[chestNum].name;
    } else {
      return 'CLOSED ' + chests[chestNum].name;
    }
  } else if (label.indexOf('dungeonClicked') === 0) {
    var dungeonNum = +label.substr(14);
    switch (value) {
      case 1:
        return dungeons[dungeonNum].abbrev + ' is a Crystal';
      case 2:
        return dungeons[dungeonNum].abbrev + ' is a 5/6 Crystal';
      case 3:
        return dungeons[dungeonNum].abbrev + ' is Green Pendant';
      case 4:
        return dungeons[dungeonNum].abbrev + ' is a Pendant';
      default:
        return 'Error';
    }
  } else if (label.indexOf('boss') === 0) {
    var dungeonNum = +label.substr(4);
    if (value == 2) {
      return dungeons[dungeonNum].abbrev + ' boss defeated';
    } else {
      return dungeons[dungeonNum].abbrev + ' boss not defeated';
    }    
  } else if (label.indexOf('medallion') === 0) {
    var dungeonNum = +label.substr(9) + 8;
    var medallionName = 'Unknown';
    switch (value) {
      case 1: medallionName = 'Bombos'; break;
      case 2: medallionName = 'Ether'; break;
      case 3: medallionName = 'Quake'; break;      
    }
    return dungeons[dungeonNum].abbrev + ' medallion is ' + medallionName;
  } else if (label.indexOf('chest') === 0) {
    var dungeonNum = +label.substr(5);
    return dungeons[dungeonNum].abbrev + ' has ' + value + ' chest' + (value == 1 ? '' : 's') + ' left';
  } else if (label === 'gomode') {
    if (value) {
      return '!!! GO MODE !!!';
    } else {
      return 'Left Go Mode';
    }
  } else if (label === 'BK') {
    return 'GOT ' + dungeons[+value].name + ' Big Key';
  } else if (label.indexOf('SK-') > -1) {
    var dunNum = +label.substr(3);
    return 'GOT ' + value + ' ' + dungeons[dunNum].abbrev + ' Small Key';  
  } else {
    if (typeof value === 'boolean') {
      if (value) {
        return 'GOT ' + itemsNames[label];
      } else {
        return 'Removed ' + itemsNames[label];
      }
    } else if (label === 'triforce') {        
      return 'GOT Triforce Piece ' + value;
    } else {
      if (itemsNames[label] && itemsNames[label][value]) {
        return 'GOT ' + itemsNames[label][value];
      }
      
    }
  }
}

function resetLog() {
  currentLog = [];
  logData = {};
  document.querySelector('#log-text-area').value = "Item log will be shown here";
}