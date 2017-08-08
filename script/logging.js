var currentLog = [];
var logData = {};

function logAction(label, status) {
  if (label && label !== 'go') {
    if (!logData.startTime) {
      logData.startTime = Date.now();
    }

    var index;
    for (var i = currentLog.length-1; i >= 0; i--) {
      if (currentLog[i].label === label) {
        index = i;
        break;
      }
    }

    if (index !== undefined && status === false && label.indexOf('chest') === 0) {
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
    console.log(currentLog);
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
  if (delta < 5000) {
    return '';
  } else if (delta < 30000) {
    return '.\r\n';
  } else if (delta < 60000) {
    return ':\r\n';
  } else if (delta < 5 * 60000) {
    return '|\r\n';
  } else {
    return '|\r\n|\r\n';
  }
}

function translateLabel(label, value) {
  if (label.indexOf('location') === 0) {
    var chestNum = +label.substr(8);
    if (value) {
      return chests[chestNum].name;
    } else {
      return 'Closed ' + chests[chestNum].name;
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
  } else {
    if (typeof value === 'boolean') {
      if (value) {
        return itemsNames[label];
      } else {
        return 'Removed ' + itemsNames[label];
      }
    } else {
      return itemsNames[label][value];
    }
  }
}