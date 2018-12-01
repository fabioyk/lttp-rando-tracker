var mode = "standard";
var goal = "ganon";
var variation = "none";
var swords = "normal";
var logic = "nmg";

function considerAga() {
    return !items.agahnim 
        && dungeons[10].isBeatable() !== "unavailable";
}

function hasFiresource() {
    return items.firerod || items.lantern;
}

function canMeltThings() {
    return items.firerod || (items.bombos && (items.sword || swords === "swordless"));
}

function canSpinSpeed() {
    return items.boots && (items.sword || items.hookshot);
}

function medallionCheck(index) {
    return ((items.bombos && items.ether && items.quake) || 
            (medallions[index]==1 && items.bombos) || 
            (medallions[index]==2 && items.ether) || 
            (medallions[index]==3 && items.quake));
}

function doableWith(func, itemName) {
    if (func()) {
        return true;
    }
    if (!Array.isArray(itemName)) {
        if (!items[itemName]) {
            items[itemName] = true;
            var result = func();
            items[itemName] = false;
            return result;
        } else {
            return false;
        }
    } else {
        var prevItems = [];
        itemName.forEach(function(i) {
            prevItems.push(items[i]);
            items[i] = true;
        });
        var result = func();
        itemName.forEach(function(i, index) {
            items[i] = prevItems[index];
        });
        return result;
    }    
}

function resetChests() {    
    highlightedChests = [];
    dungeons.forEach(function(dun) {
        dun.isBeaten = false;
    });
    chests.forEach(function(chest) {
        chest.isOpened = false;
    });
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
      } else if (variation === "retro") {
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
    if (mode === "standard") {
        // Change initial chests to checked in standard
        var initialChests = [2, 56, 57, 58, 64];
        initialChests.forEach(function(chestNum) {
            chests[chestNum].isOpened = true;
            document.getElementById(chestNum).className = "chest opened";
        });

    }    
}

var regions = {  
    westDeathMountain: function(isGlitch) {
        switch (logic) {
            case "nmg":
                if (mode === "inverted") {
                    return (items.glove && (items.lantern || isGlitch)) || (items.allflute >= 2 && regions.invertedLW() && items.moonpearl);
                } else {
                    return items.allflute >= 2 || (items.glove && items.lantern);
                }                
            case "owg":
                return items.boots || items.allflute >= 2 || (items.glove && items.lantern);    
            case "major":
                return true;         
        }
    },
    eastDeathMountain: function() {
        switch (logic) {
            case "nmg":
                return regions.westDeathMountain() && (items.hookshot || (items.mirror && items.hammer));
            case "owg":
                return items.boots || (regions.westDeathMountain() && (items.hookshot || (items.mirror && items.hammer)));
            case "major":
                return true;
        }
    },
    darkEastDeathMountain: function() {
        switch (logic) {
            case "nmg":
                return items.glove === 2 && regions.eastDeathMountain() && items.moonpearl;
            case "owg":
                return (items.boots && items.moonpearl) || 
                    ((items.glove === 2 || (items.hammer && items.boots)) && regions.eastDeathMountain());
            case "major":
                return true;
        }
    },
    darkWestDeathMountain: function() {
        if (logic !== "major") {
            return regions.westDeathMountain() && items.moonpearl;
        } else {
            return items.moonpearl || items.bottle;
        }
    },
    northEastDarkWorld: function() {
        switch (logic) {
            case "nmg":
                return  items.agahnim || 
                        (items.hammer && items.glove && items.moonpearl) ||
                        (items.glove === 2 && items.flippers && items.moonpearl);
            case "owg":
                return items.agahnim ||
                        (items.mirror && canSpinSpeed()) ||
                        (items.moonpearl && 
                            (canSpinSpeed() || 
                            (items.glove === 2 && (items.boots || items.flippers)) ||
                            (items.hammer && items.glove) ||
                            (items.mirror && regions.westDeathMountain())));
            case "major":
                return items.moonpearl || items.bottle;
        }
    },
    northWestDarkWorld: function() {
        switch (logic) {
            case "nmg":
                return (regions.northEastDarkWorld() &&
                        (items.hookshot &&
                            (items.hammer || items.glove || items.flippers)) ||
                        (items.hammer && items.glove) ||
                        items.glove === 2) &&
                    items.moonpearl;
            case "owg":
                return (items.moonpearl &&
                            (items.glove === 2 ||
                                canSpinSpeed() ||
                                (items.hammer && items.glove) ||
                                (items.agahnim && (items.boots ||
                                    (items.hookshot &&
                                        (items.hammer || items.glove || items.flippers)))))) ||
                        (items.mirror && regions.westDeathMountain());
            case "major":
                return (items.moonpearl || items.bottle);
        }
    },
    SouthDarkWorld: function() {
        switch (logic) {
            case "nmg":
                return items.moonpearl &&
                    ((regions.northEastDarkWorld() && (items.hammer ||
                        (items.hookshot && (items.flippers || items.glove)))) ||
                        (items.hammer && items.glove) ||
                        items.glove === 2);
            case "owg":
                return items.moonpearl && (((items.glove === 2 ||
                            canSpinSpeed() ||
                            (items.hammer && items.glove) ||
                            (items.agahnim && (items.hammer ||
                                items.boots ||
                                (items.hookshot && (items.glove || items.flippers)))))) ||
                        (items.mirror && regions.westDeathMountain()));
            case "major":
                return items.moonpearl || items.bottle;
        }
    },
    mire: function() {
        if (mode === 'inverted') {
            return (items.allflute >= 2 && items.moonpearl && regions.invertedLW()) 
                || (items.mirror && regions.invertedLW());
        }
        switch (logic) {
            case "nmg":
                return items.allflute >= 2 && items.glove === 2;
            case "owg":
                return (items.glove === 2 && (items.allflute >= 2 || items.boots)) || 
                    ((items.mirror || (items.moonpearl && items.boots)) && regions.SouthDarkWorld());
            case "major":
                return items.moonpearl || items.bottle || items.mirror;
        }
    },

    invertedLW: function() {
        return items.agahnim ||
            (items.moonpearl && ((items.hammer && items.glove) || items.glove === 2));
    },
    invertedEastDM: function(isGlitch) {
        return (items.glove === 2 || (items.moonpearl && items.hookshot)) 
            && ((items.glove && (items.lantern || isGlitch)) || (items.allflute >= 2 && items.moonpearl && regions.invertedLW()));
    },
    invertedEastDWDM: function() {
        return regions.westDeathMountain();
    },
    invertedNEDW: function() {
        return items.hammer || items.flippers || (items.mirror && regions.invertedLW());
    },

};

// define dungeon chests
var dungeons = new Array;

dungeons[0] = {
    name: "Eastern Palace",
    abbrev: "EP",
    x: "46.8%",
    y: "38.8%",
    image: "boss02.png",
    isBeaten: false,
    isBeatable: function(){
        if (!this.isAccessible()) {
            return "unavailable";
        }        
		if(items.bow>1 && items.lantern && (variation !== "keysanity" || sphereCounter.boss0))
			return "available";
        if (items.bow>1 && (variation !== "keysanity" || sphereCounter.boss0))
            return "glitched";
		return "unavailable";
    },
    kChestCount: 6,
    canGetChest: function(){
        if (!this.isAccessible()) {
            return "unavailable";
        }
        if (variation === "keysanity") {            
            if (this.accessibleChests(true) === 6) {
                return "available";
            } else if (items.chest0 > 6-this.accessibleChests(true)) {
                return "possible";
            } else if (items.chest0 > 6-this.accessibleChests(false)) {
                return "glitched";
            } else {
                return "unavailable";
            }
        } else {
            if (mode === 'inverted' && !items.moonpearl) {
                return "glitched";
            }
            if(items.bow>1 && items.lantern)
                return "available";
            if (items.bow>1)
                return "glitched";
            return "possible";
        }
    },
    isAccessible: function() {
        if (mode === 'inverted') {
            return regions.invertedLW();
        }
        return true;
    },
    accessibleChests: function(inLogic) {
        var normalChests = 3;
        var withGlitches = 0;
        if (items.lantern) {
            normalChests++;
        } else {
            withGlitches++;
        }
        if (sphereCounter.boss0) {
            normalChests++;
            if (items.bow>1) {
                if (items.lantern) {
                    normalChests++;
                } else {
                    withGlitches++;
                }
            }
        }

        if (inLogic) {
            return normalChests;
        } else {
            return normalChests + withGlitches;
        }
    }
};

dungeons[1] = {
    name: "Desert Palace",
    abbrev: "DP",
    x: "3.8%",
    y: "78.4%",
    image: "boss12.png",
    isBeaten: false,
    isBeatable: function(){
        if (!this.isKillable())
            return "unavailable";
        if (!this.isAccessible() && this.isKillable() && items.boots && items.glove && mode === "inverted" && considerAga() && doableWith(this.isAccessible, "agahnim")) {
            return "aga";
        }
        if(!(this.isAccessible() && (items.glove || logic === "major") && hasFiresource()))
            return "unavailable";
        if (mode === 'inverted' && !items.moonpearl) {
            return "unavailable";
        }
        if(!items.boots && variation !== "keysanity")
            return "possible";        
        return "available";		
    },
    kChestCount: 6,
    canGetChest: function(){        
        if (!this.isAccessible()) {
            if (mode === "inverted" && considerAga() && doableWith(this.isAccessible, "agahnim")) {
                return "aga";
            }
            return "unavailable";
        }
        if (variation === "keysanity") {
            var chestNum = this.accessibleChests(true);
            if (chestNum === 6) {
                return "available";
            } else {
                if (items.boots) {
                    if (items.chest1 > 6-chestNum) {
                        return "possible";
                    } else {
                        return "unavailable";
                    }
                } else {
                    if (items.chest1 > 5-chestNum) {
                        return "possible";
                    } else {
                        return "unavailable";
                    }
                }
            }
        } else {
            if ((items.glove || logic === "major") && hasFiresource() && items.boots 
                && this.isKillable() && (variation !== "keysanity" || sphereCounter.chest1)) {
                if (mode === 'inverted' && !items.moonpearl) {
                    return "glitched";
                }
                return "available";
            }
            return "possible";
        }
        
    },
    isAccessible: function() {
        if (mode === 'inverted') {
            return (items.book && regions.invertedLW());
        }
        switch(logic) {
            case "nmg":
                return items.book || (items.allflute >= 2 && items.glove == 2 && items.mirror);
            case "owg":
                return items.book || items.boots || (items.mirror && regions.mire());
            case "major":
                return true;
        }
            
    },
    isKillable: function() {
        return (items.sword || items.hammer || items.bow > 1 || items.firerod || 
              items.icerod || items.byrna || items.somaria) && (variation !== "keysanity" || sphereCounter.boss1);
    },
    accessibleChests: function(inLogic) {
        var normalChests = 1;
        if (items.boots) {
            normalChests++;
        }
        if (sphereCounter.chest1) {
            normalChests += 2;
        }
        if (sphereCounter.boss1) {
            normalChests++;
            if (items.glove && hasFiresource() && this.isKillable()) {
                normalChests++;
            }
        }
        return normalChests;
    }
};

dungeons[2] = {
    name: "Tower of Hera",
    abbrev: "Hera",
    x: "31.0%",
    y: "5.5%",
    image: "boss22.png",
    isBeaten: false,
    isBeatable: function(){
        if (!this.isAccessible()) {
            if (doableWith(this.isAccessible, "lantern") && this.isKillable()) {
                return "glitched";
            } else {
                return "unavailable";
            }
        } else {
            if ((hasFiresource() || variation === "keysanity") && this.isKillable()) {
                return "available";
            } else if (this.isKillable()) {
                return "possible";
            } else {
                return "unavailable";
            }
        }
    },
    kChestCount: 6,
    canGetChest: function(){
        if (!this.isAccessible()) {
            if (variation === "keysanity" && doableWith(this.isAccessible, "lantern")) {
                var chestNum = this.accessibleChests(true);
                if (items.chest2 > 6-chestNum) {
                    return "glitched";
                } else {
                    return "unavailable";
                }
            } else {
                if (doableWith(this.isAccessible, "lantern")) {
                    return "glitched";
                } else {
                    return "unavailable";
                }
            }            
        } else {
            if (variation === "keysanity") {
                var chestNum = this.accessibleChests(true);
                if (chestNum === 6) {
                    return "available";
                } else if (items.chest2 > 6-chestNum) {
                    return "possible";
                } else {
                    return "unavailable";
                }
            } else {
                if (hasFiresource() && this.isKillable()) {
                    return "available";
                } else {
                    return "possible";
                }
            }            
        }
    },
    isAccessible: function() {
        if (mode === 'inverted') {
            return items.moonpearl && items.hammer && 
                (regions.invertedEastDM() || (doableWith(regions.invertedEastDM, "lantern")));
        }
        switch(logic) {
            case "nmg":
                return regions.westDeathMountain() && (items.mirror || (items.hammer && items.hookshot));
            case "owg":
                return items.boots || 
                    ((items.mirror || (items.hookshot && items.hammer)) && regions.westDeathMountain());
            case "major":
                return dungeons[8].isAccessible() || items.boots || 
                    ((items.mirror || (items.hookshot && items.hammer)) && regions.westDeathMountain());
        }
        
    },
    isKillable: function() {
        return (items.sword || items.hammer) && (variation !== "keysanity" || sphereCounter.boss2);
    },
    accessibleChests: function(inLogic) {
        var normalChests = 2;
        if (sphereCounter.chest2 && hasFiresource()) {
            normalChests++;
        }
        if (sphereCounter.boss2) {
            normalChests += 2;
            if (this.isKillable()) {
                normalChests++;
            }
        }
        return normalChests;
    }
};

dungeons[3] = {
    name: "Palace of Darkness",
    hint: "<img src='images/lantern.png' class='mini'>",
    abbrev: "PoD",
    x: "97.0%",
    y: "40.0%",
    image: "boss32.png",
    isBeaten: false,
    isBeatable: function(){
        if (!this.isAccessible()) {
            if (considerAga() && doableWith(this.isAccessible, "agahnim") && this.isKillable()) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        if (this.isKillable() && items.lantern) {
            return "available";
        } else if (this.isKillable()) {
            return "glitched";
        } else {
            return "unavailable";
        }
    },
    kChestCount: 14,
    canGetChest: function(){
        if (!this.isAccessible()) {
            if (considerAga() && doableWith(this.isAccessible, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        if (variation === "keysanity") {
            var logicChests = this.accessibleChests(true);
            var glitchedChests = this.accessibleChests(false);
            if (logicChests === 14) {
                return "available";
            } else if (items.chest3 > 14-logicChests) {
                return "possible";
            } else if (items.chest3 > 14-glitchedChests) {
                return "glitched";
            } else {
                return "unavailable";
            }
        } else {
            if (this.isKillable() && items.lantern) {
                return "available";
            } else if (this.isKillable() && !items.lantern) {
                return "glitched";
            } else {
                return "possible";
            }     
        }
		   
    },
    isAccessible: function() {
        if (mode === 'inverted') {
            return regions.invertedNEDW();
        }
        return items.moonpearl && regions.northEastDarkWorld();
    },
    isKillable: function() {
        return (items.bow > 1 && items.hammer) 
            && (variation !== "keysanity" || (sphereCounter.boss3 && sphereCounter.chest3));
    },
    accessibleChests: function(inLogic) {
        var minChests, maxChestsGlitched;
        if (!items.hammer || items.bow<=1) {
            switch (sphereCounter.chest3) {
                case 0:
                    minChests = 1;
                    break;
                case 1:
                    minChests = 3;
                    break;
                case 2:
                case 3:
                case 4:
                    minChests = 3;
                    maxChestsGlitched = 8 + (sphereCounter.chest3 - 2);
                    if (sphereCounter.boss3) {
                        maxChestsGlitched++;
                    }
                    break;
                case 5:
                case 6:
                    minChests = 6;
                    if (items.lantern) {
                        minChests += 3;
                        if (sphereCounter.boss3) {
                            minChests++;
                        }
                    }
                    maxChestsGlitched = 10;
                    if (sphereCounter.boss3) {
                        maxChestsGlitched++;
                    }
                    break;                    
            }
            if (items.bow > 1) {
                minChests += 2;
                maxChestsGlitched += 2;
            } else if (items.bottle) {
                maxChestsGlitched += 2;
            }
        }
        if (items.hammer && items.bow>1) {
            switch(sphereCounter.chest3) {
                case 0:
                    minChests = maxChestsGlitched = 5;
                    break;
                case 1:
                case 2:
                    minChests = 5;
                    maxChestsGlitched = 10 + (sphereCounter.chest3-1);
                    if (sphereCounter.boss3) {
                        maxChestsGlitched++;
                    }
                    break;
                case 3:
                case 4:
                case 5:
                    minChests = 6;                        
                    if (items.lantern) {
                        minChests += 2;
                    }
                    maxChestsGlitched = 11 + (sphereCounter.chest3-3);
                    if (maxChestsGlitched === 13 && !sphereCounter.boss3) {
                        maxChestsGlitched--;
                    }
                    if (sphereCounter.boss3) {
                        maxChestsGlitched++;
                        if (sphereCounter.chest3 === 5) {
                            maxChestsGlitched++;
                        }
                    }
                    break;
                case 6: 
                    minChests = 8;
                    if (items.lantern) {
                        minChests += 4;
                        if (sphereCounter.boss3) {
                            minChests += 2;
                        }
                    }
                    maxChestsGlitched = 12;
                    if (sphereCounter.boss3) {
                        maxChestsGlitched += 2;
                    }
            }
        }

        if (inLogic) {
            return minChests;
        } else {
            return maxChestsGlitched;
        }
    } 
};

dungeons[4] = {
    name: "Swamp Palace",
    hint: "<img src='images/mirror.png' class='mini'>",
    abbrev: "SP",
    x: "73.5%",
    y: "91.0%",
    image: "boss42.png",
    isBeaten: false,
    isBeatable: function(){
        if (logic !== "major") {
            if (!this.isAccessible()) {
                if (considerAga() && doableWith(this.isAccessible, "agahnim") && this.isKillable()) {
                    return "aga";
                } else {
                    return "unavailable";
                }
            } else if (this.isKillable()) {
                return "available";
            } else {
                return "unavailable";
            }
        } else {
            if (this.isAccessible() && items.moonpearl && items.mirror && items.flippers && items.hookshot) {
                if (dungeons[8].isAccessible()) {
                    return "available";
                } else {
                    return "possible";
                }
            } else {
                return "unavailable";
            }
        }
    },
    kChestCount: 10,
    canGetChest: function(){
        if (!this.isAccessible()) {
            if (mode !== "inverted" && considerAga() && doableWith(this.isAccessible, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        if (variation === "keysanity") {
            var chestCount = this.accessibleChests(true);
            if (chestCount === 10) {
                return "available";
            } else if (items.chest4 > 10-chestCount) {
                return "possible";
            } else {
                return "unavailable";
            }
        } else {
            if (logic !== "major") {
                if (this.isKillable() && (variation !== "keysanity" || sphereCounter.boss4)) {
                    return "available";      
                } else {  
                    return "possible";
                }
            } else {
                if (items.moonpearl && items.mirror && items.hookshot && items.flippers) {
                    if (dungeons[8].isAccessible()) {
                        return "available";
                    } else {
                        return "possible";
                    }
                } else {
                    return "possible";
                }
            }
        }        
        
    },
    isAccessible: function() {
        if (mode === 'inverted') {
            return items.moonpearl && items.mirror && items.flippers && regions.invertedLW();
        }
        if (logic !== "major") {
            return items.moonpearl && items.mirror && items.flippers && regions.SouthDarkWorld();
        } else {
            return (items.flippers && items.mirror && items.moonpearl) || dungeons[8].isAccessible();
        }
    },
    isKillable: function() {
        return items.hookshot && items.hammer && (variation !== "keysanity" || sphereCounter.chest4);
    },
    accessibleChests: function(inLogic) {
        var chestCount = 1;
        if (sphereCounter.chest4) {
            chestCount++;
            if (items.hammer) {
                chestCount += 3;
                if (sphereCounter.boss4) {
                    chestCount++;
                }
                if (items.hookshot) {
                    chestCount += 4;
                }
            }
        }
        return chestCount;
    }
};

dungeons[5] = {
    name: "Skull Woods",
    abbrev: "SW",
    x: "53.3%",
    y: "5.4%",
    image: "boss52.png",
    isBeaten: false,
    isBeatable: function(){
        if (!this.isAccessible() && mode !== "inverted") {
            if (considerAga() && doableWith(this.isAccessible, "agahnim") && items.firerod && this.canKillBoss()) {
                return "aga";
            } else {
                return "unavailable";
            }
        } else {
            if (this.isAccessible()) {
                if (items.firerod && this.canKillBoss()) {
                    return "available";
                } else if (items.firerod && (items.sword || swords === "swordless")) {
                    return "possible";
                }
            }
            return "unavailable";
        }
    },
    kChestCount: 8,
    canGetChest: function(){        
        if (!this.isAccessible()) {
            if (considerAga() && doableWith(this.isAccessible, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        } else {
            if (variation === "keysanity") {
                var availableChests = this.accessibleChests(true);
                if (availableChests === 8) {
                    return "available";
                } else if (items.chest5 > 8-availableChests) {
                    return "possible";
                } else {
                    return "unavailable";
                }
            } else {
                if (items.firerod && (items.sword || swords === "swordless") 
                        && (variation !== "keysanity" || sphereCounter.boss5)) {
                    return "available";
                } else {
                    return "possible";
                }
            }
        }
        
    },
    isAccessible: function() {
        if (mode === 'inverted') {
            return true;
        }
        switch (logic) {
            case "nmg":
                return items.moonpearl && regions.northWestDarkWorld();
            case "owg":
                return regions.northWestDarkWorld();
            case "major":
                return true;
        }
    },
    canKillBoss: function() {
        return items.sword || items.hammer || (items.bottle && (items.firerod || items.somaria || items.byrna))
            || (items.boots && items.bottle && items.net);
    },
    accessibleChests: function(inLogic) {
        var availableChests = 5;
        if (sphereCounter.boss5) {
            availableChests++;
        }
        if (items.firerod) {
            availableChests++;
            if (items.sword || swords === "swordless") {
                availableChests++;
            }
        }
        return availableChests;
    }
};

dungeons[6] = {
    name: "Thieves' Town",
    abbrev: "TT",
    x: "56.4%",
    y: "47.9%",
    image: "boss62.png",
    isBeaten: false,
    isBeatable: function(){
		if (!this.isAccessible()) {
            if (considerAga() && doableWith(this.isAccessible, "agahnim") && this.canKillBoss()) {
                return "aga";
            } else {
                return "unavailable";
            }
        } else {
            if (this.canKillBoss()) {
                return "available";
            } else {
                return "unavailable";
            }
        }
    },
    kChestCount: 8,
    canGetChest: function(){
        if (!this.isAccessible()) {
            if (considerAga() && doableWith(this.isAccessible, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        } 
        if (variation === "keysanity") {
            var chestCount = this.accessibleChests(true);
            if (chestCount === 8) {
                return "available";
            } else if (items.chest6 > 8-chestCount) {
                return "possible";
            } else {
                return "unavailable";
            }
        } else {
            if (items.hammer && this.canKillBoss() && (variation !== "keysanity" || sphereCounter.chest6)) {
                return "available";
            } else {
                return "possible";
            }
        }
    },
    isAccessible: function() {
        if (mode === 'inverted') {
            return true;
        }
        if (logic !== "major") {
            return items.moonpearl && regions.northWestDarkWorld();
        } else {
            return items.moonpearl || items.bottle;
        }
    },
    canKillBoss: function() {
        return (items.sword || items.hammer || items.somaria || items.byrna)
                && (variation !== "keysanity" || sphereCounter.boss6);
    },
    accessibleChests: function(inLogic) {
        var chestCount = 4;
        if (sphereCounter.boss6) {
            chestCount += 3;
            if (sphereCounter.chest6 && items.hammer) {
                chestCount++;
            }
        }
        return chestCount;
    }  
};

dungeons[7] = {
    name: "Ice Palace",
    abbrev: "IP",
    x: "89.8%",
    y: "85.8%",
    image: "boss72.png",
    isBeaten: false,
    isBeatable: function(){
        if (logic !== "major") {
            if (!this.isAccessible()) {
                var glitchList = [];
                glitchList.push("flippers");
                glitchList.push("moonpearl");
                if (doableWith(this.isAccessible, glitchList) && items.hammer && items.glove) {
                    return "glitched";
                } else {
                    return "unavailable";
                }
            } else {
                if (items.hookshot && items.somaria && items.hammer && items.glove) {
                    return "available";
                } else if (items.hammer) {
                    return "possible";
                } else {
                    return "unavailable";
                }
            }
        } else {
            if (this.isAccessible() && canMeltThings() && items.glove && items.hammer) {
                return "available";
            } else {
                return "unavailable";
            }
        }
    },
    kChestCount: 8,
    canGetChest: function(){
        if (logic !== "major") {
            if (!this.isAccessible()) {
                var glitchList = [];
                glitchList.push("flippers");
                glitchList.push("moonpearl");
                if (doableWith(this.isAccessible, glitchList)) {
                    return "glitched";
                } else {
                    return "unavailable";
                }
            } else if (variation === "keysanity") {                
                if (this.accessibleChests(true) === 8) {
                    return "available";
                } else if (items.chest7 > 8-this.accessibleChests(true)) {
                    return "possible";
                } else if (items.chest7 > 8-this.accessibleChests(false)) {
                    return "glitched";
                } else {
                    return "unavailable";
                }
            } else {
                if (items.hookshot && items.somaria && items.hammer && (variation !== "keysanity" || sphereCounter.boss7)) {
                    return "available";
                } else {
                    return "possible";
                }
            }
        } else {
            if (!this.isAccessible()) {
                return "unavailable";
            } else {
                if (canMeltThings() && items.glove && items.hammer) {
                    return "available";
                } else {
                    return "possible";
                }
            }
        }
    },
    isAccessible: function() {
        if (mode === 'inverted') {
            return items.flippers && canMeltThings();
        }
        switch (logic) {
            case "nmg":
                return items.moonpearl && items.flippers && items.glove === 2 && canMeltThings();
            case "owg":
                return items.glove === 2 && canMeltThings();
            case "major":
                return items.glove === 2 || (items.mirror && (items.moonpearl || items.bottle));
        }
    },
    accessibleChests: function(inLogic) {
        var minChests, maxChests;
        minChests = 3;
        maxChests = 4;
        if (sphereCounter.boss7) {
            minChests++;
            maxChests++;
        }
        if (items.hookshot || sphereCounter.boss7 ? items.hookshot : sphereCounter.chest7) {
            minChests ++;
            if (items.hammer) {
                minChests += 2;
            }
        }
        if (sphereCounter.boss7 && items.hammer && ((items.somaria && sphereCounter.chest7) || sphereCounter.chest7 > 1)) {
            minChests++;
        }
        if (items.hammer) {
            maxChests += 3;
        }
        if (inLogic) {
            return minChests;
        } else {
            return maxChests;
        }
    } 
};

dungeons[8] = {
    name: "Misery Mire",
    hint: "<img src='images/medallion0.png' class='mini'><img src='images/lantern.png' class='mini'>",
    abbrev: "MM",
    x: "55.8%",
    y: "82.9%",
    image: "boss82.png",
    isBeaten: false,
    isBeatable: function(){
		var canClear;
        if (logic !== "major") {
            canClear = items.somaria && items.lantern && (variation !== "keysanity" || sphereCounter.boss8);
        } else {
            canClear = items.somaria || items.sword || items.hammer || (items.hookshot && items.flippers && (items.firerod || items.icerod || items.bow > 1))
        }
		if (!this.isAccessible() || !this.canKillBoss()) {
            return "unavailable";
        } else if (items.moonpearl) {
            if (canClear) {
                return "available";
            } else if (logic !== "major" && items.somaria && hasFiresource() && (goal !== "keysanity" || sphereCounter.boss8)) {
                return "glitched";
            } else {
                return "unavailable";
            }
        } else if (items.bottle && items.net && 
                        (canClear || (items.somaria && items.firerod))) {            
            return "glitched";
        } else {
            return "unavailable";
        }
    },
    kChestCount: 8,
    canGetChest: function(){
        var canClear;
        if (logic !== "major") {
            canClear = items.somaria && items.lantern && (variation !== "keysanity" || sphereCounter.boss8);
        } else {
            canClear = items.somaria || items.sword || items.hammer || (items.hookshot && items.flippers && (items.firerod || items.icerod || items.bow > 1))
        }
		if (!this.isAccessible()) {
            return "unavailable";
        } else {
            if (variation === "keysanity") {                
                if (this.accessibleChests(true) === 8) {
                    return "available";
                } else if (items.chest8 > 8-this.accessibleChests(true)) {
                    return "possible";                
                } else if (items.chest8 > 8-this.accessibleChests(false)) {
                    return "glitched";
                } else {
                    return "unavailable";
                }

            } else {
                if (canClear && this.canKillBoss()) {                
                    return "available";
                } else if (logic !== "major" && items.somaria && hasFiresource() && (goal !== "keysanity" || sphereCounter.boss8)) {
                    return "glitched";
                } else {
                    return "possible";
                }
            }
            
        }
    },
    isAccessible: function() {
        var hasMedallion = medallionCheck(0) && (items.sword || swords === "swordless");
        if (mode === 'inverted') {
            return hasMedallion && (items.boots || items.hookshot) && regions.mire();
        }
        switch (logic) {
            case "nmg":
                return hasMedallion && items.moonpearl && items.glove === 2 && items.allflute >= 2 && (items.boots || items.hookshot);
            case "owg":
                return hasMedallion && items.moonpearl && regions.mire() && (items.boots || items.hookshot);
            case "major":
                return hasMedallion && (items.moonpearl || items.bottle) && (items.boots || items.hookshot);
        }
    },
    canKillBoss: function() {
        return items.sword || items.hammer || items.bow > 1;
    },
    accessibleChests: function(inLogic) {
        var minChests = 2, maxChests = 6;
        if (sphereCounter.boss8) {
            minChests++;
            maxChests++;
            if (items.somaria) {
                maxChests++;
            }
        }
        if (sphereCounter.boss8 || sphereCounter.chest8) {
            minChests += 2;
        }
        if (hasFiresource() && sphereCounter.chest8 === 3) {
            minChests += 2;
        }
        if (sphereCounter.boss8 && items.somaria && items.lantern && this.canKillBoss()) {
            minChests++;
        }
        if (inLogic) {
            return minChests;
        } else {
            return maxChests;
        }
    }  
};

dungeons[9] = {
    name: "Turtle Rock",
    hint: "<img src='images/medallion0.png' class='mini'><img src='images/lantern.png' class='mini'>",
    abbrev: "TR",
    x: "96.9%",
    y: "7.0%",
    image: "boss92.png",
    isBeaten: false,
    isBeatable: function(){
		if (!this.isAccessible()) {
            if (doableWith(this.isAccessible, "lantern") && items.firerod && items.icerod && items.somaria && (items.lantern || glitches.darkrooms.tr)) {
                return "glitched";
            } else {
                return "unavailable";
            }
        } else {
            if (logic !== "major") {
                if (this.canKillBoss()) {
                    if (items.lantern) {
                        return "available";
                    } else {
                        return "glitched";
                    }
                } else {
                    return "unavailable";
                }
            } else {
                if (this.canKillBoss()) {
                    return "available";
                } else {
                    return "unavailable";
                }
            }
        }
    },
    kChestCount: 12,
    canGetChest: function(){
        if (!this.isAccessible()) {
            if (doableWith(this.isAccessible, "lantern")) {
                return "glitched";
            } else {
                return "unavailable";
            }
        } else {
            if (logic !== "major") {
                if (variation === "keysanity") {                    
                    if (this.accessibleChests(true) === 12) {
                        return "available";
                    } else if (items.chest9 > 12-this.accessibleChests(true)) {
                        return "possible";
                    } else if (items.chest9 > 12-this.accessibleChests(false)) {
                        return "glitched";
                    } else {
                        return "unavailable";
                    }
                } else {
                    if (this.canKillBoss() && (variation !== "keysanity" || sphereCounter.chest9 >= 4)) {
                        if (items.lantern) {
                            return "available";
                        } else {
                            return "glitched";
                        }
                    } else {
                        return "possible";
                    }
                }                
            } else {
                if (this.canKillBoss() && (variation !== "keysanity" || sphereCounter.chest9 >= 4)) {
                    return "available";
                } else {
                    return "possible";
                }
            }
        }
    },
    isAccessible: function() {        
        var hasMedallion = medallionCheck(1) && (items.sword || swords === "swordless");
        if (mode === 'inverted') {
            return ((regions.invertedEastDM() || (doableWith(regions.invertedEastDM, "lantern"))) && items.mirror)
                || ((regions.invertedEastDWDM() || (doableWith(regions.invertedEastDWDM, "lantern"))) && hasMedallion && items.somaria && items.hammer); // TODO check
        }
        switch (logic) {
            case "nmg":
                return hasMedallion && items.moonpearl && items.somaria && items.glove === 2 && items.hammer && regions.eastDeathMountain();
            case "owg":
                return (hasMedallion && items.moonpearl && items.somaria && items.hammer && (items.glove === 2 || items.boots) && regions.eastDeathMountain()) ||
                        ((items.mirror || (items.moonpearl && canSpinSpeed())) && regions.darkEastDeathMountain());
            case "major":
                return items.mirror || items.moonpearl || items.bottle;

        }
    },
    canKillBoss: function() {
        return items.firerod && items.icerod && items.somaria 
            && (variation !== "keysanity" || (sphereCounter.boss9 && sphereCounter.chest9 >= 3));
    },
    accessibleChests: function(inLogic) {
        var minChests = 1, maxChests = 1;
        if (items.firerod) {
            minChests += 2;
            maxChests += 2;
        }
        if (sphereCounter.chest9 >= 1) {
            minChests++;
            maxChests++;
            if (sphereCounter.chest9 >= 2) {
                minChests++;
                maxChests++;
                if (sphereCounter.boss9) {
                    minChests += 2;
                    maxChests += 2;
                    if (sphereCounter.chest9 >= 3) {
                        maxChests += 4;
                        if (items.lantern && (items.byrna || items.cape || items.shield === 3)) {
                            minChests += 4;
                        }
                        if (sphereCounter.chest9 == 4 && items.icerod && items.firerod && items.lantern) {
                            minChests ++;
                        }
                        if (items.icerod && items.firerod) {
                            maxChests++;
                        }
                    }
                }
            }
        }
        if (inLogic) {
            return minChests;
        } else {
            return maxChests;
        }
    } 
};

dungeons[10] = {
    name: "Aga Tower",
    abbrev: "AT",
    x: "25%",
    y: "40%",
    image: "agahnim.png",
    isBeaten: false,
    isBeatable: function(){
        var hasKeys = (variation !== "keysanity" || sphereCounter.agahnim === 2);
        if (this.isAccessible()) {
            if (this.canKillBoss() && this.canKillThings() && items.lantern && hasKeys) {
                return "available";
            } else if (this.canKillBoss() && items.lantern && hasKeys) {
                return "possible";
            } else if (this.canKillBoss() && hasKeys) {
                return "glitched";
            } else {
                return "unavailable";
            }
        } else if (mode === "inverted" && regions.westDeathMountain(true)) {
            if (this.canKillBoss() && hasKeys) {
                return "glitched";
            } else {
                return "unavailable";
            }
        }
        return "unavailable";
    },
    kChestCount: 2,
    canGetChest: function(){
        if (variation === "keysanity") {
            if (this.isAccessible()) {
                if (sphereCounter.agahnim >= 1) {
                    return "available";
                }
                return "possible";
            } else if (mode === "inverted" && regions.westDeathMountain(true)) {
                return "glitched";
            } else {
                return "unavailable";
            }
        } else {
            if (this.isAccessible()) {
                if (items.lantern && (variation !== "keysanity" || sphereCounter.agahnim >= 1)) {
                    return "available";
                } else if (variation !== "keysanity" || sphereCounter.agahnim >= 1) {
                    return "glitched";
                } else {
                    return "possible";
                }
            } else if (mode === "inverted" && regions.westDeathMountain(true)) {
                return "glitched";
            } else {
                return "unavailable";
            }
        }
    },
    canKillBoss: function() {
        if (swords === "swordless") {
            return (items.hammer || items.net);
        } else {
            return items.sword;
        }
    },
    canKillThings: function() {
        return items.sword || items.somaria || (items.bow > 1) || items.hammer || items.firerod
            || (items.byrna && items.bottle);
    },
    isAccessible: function() {
        if (mode === 'inverted') {
            return regions.westDeathMountain();
        }
        if (swords !== "swordless") {
            return items.cape || items.sword >= 2
        } else {
            return items.cape || items.hammer
        }  
    },
    accessibleChests: function(inLogic) {
        var minChests = 1, maxChests = 1;
        if (sphereCounter.agahnim >= 1) {
            maxChests++;
            if (items.lantern) {
                minChests++;
            }
        }
        if (inLogic) {
            return minChests;
        } else {
            return maxChests;
        }
    } 
};

function getChestsLeftText(dungeonNum) {
    if (variation === "keysanity" && dungeonNum != 10 && dungeons[dungeonNum].isAccessible()) {
        var value = dungeons[dungeonNum].accessibleChests(true)-(dungeons[dungeonNum].kChestCount-items["chest"+dungeonNum]);
        if (value <= 0) {
            return "";
        } else {            
            return value;
        }
    } else {
        return "";
    }
}

//define overworld chests
var chests = new Array;

chests[0] = {
    name: "King's Tomb",
    hint: "<img src='images/boots.png' class='mini'> + <img src='images/glove2.png' class='mini'>/<img src='images/mirror.png' class='mini'>",
    x: "30.8%",
    y: "29.6%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.boots && items.glove === 2 && items.moonpearl && regions.invertedLW()) {
                return "available";
            } else {
                return "unavailable";
            }
        }
        switch (logic) {
            case "nmg":
                if (items.boots && (items.glove === 2 || (items.mirror && regions.northWestDarkWorld()))) {
                    return "available";
                } else if (items.boots && items.mirror && considerAga() && doableWith(regions.northWestDarkWorld, "agahnim")) {
                    return "aga";
                } else {
                    return "unavailable";
                }
            case "owg":
                if (items.boots && (items.glove === 2 || (items.mirror && items.moonpearl))) {
                    return "available";
                } else {
                    return "unavailable";
                }
            case "major":
                if (items.boots && (items.glove === 2 || (items.mirror && (items.moonpearl || items.bottle)))) {
                    return "available";
                } else {
                    return "unavailable";
                }
        }
    }
};

chests[1] = {
    name: "Dam",
    hint: "(2)",
    x: "23.4%",
    y: "93.4%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW()) {
                return "available";
            } else if (items.mirror && regions.invertedLW()) {
                return "glitched";
            } else if (items.moonpearl && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
	    return "available";
    }
};

chests[2] = {
    name: "Link's House",
    x: "27.4%",
    y: "67.9%",
    isOpened: false,
    isAvailable: function(){
	    return "available";
    }
};

chests[3] = {
    name: "Spiral Cave",
    x: "39.9%",
    y: "9.3%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (regions.invertedEastDM() && items.moonpearl) {
                return "available";
            } else if (doableWith(regions.invertedEastDM, "lantern")) {
                return "glitched";
            } else {
                return "unavailable";
            }
        }
        if (regions.eastDeathMountain()) {
            return "available";
        } else if (doableWith(regions.eastDeathMountain, "lantern")) {
            return "glitched";
        } else {
            return "unavailable";
        }
    }
};

chests[4] = {
    name: "Mimic Cave",
    hint: "(<img src='images/mirror.png' class='mini'> outside of Turtle Rock)(Yellow = possible w/out <img src='images/firerod.png' class='mini'>)",
    x: "42.6%",
    y: "9.3%",
    isOpened: false,
    isAvailable: function() {
        if (mode === 'inverted') {
            if (regions.invertedEastDM() && items.hammer && items.moonpearl) {
                return "available";
            } else if (doableWith(regions.invertedEastDM, "lantern") && items.hammer && items.moonpearl) {
                return "glitched";
            } else {
                return "unavailable";
            }
        }
        switch (logic) {
            case "nmg":
                if (dungeons[9].isAccessible() && items.mirror) {
                    if (items.firerod || (variation === "keysanity" && sphereCounter.chest9 >= 2)) {
                        return "available";
                    } else {
                        return "possible";
                    }
                } else if (doableWith(dungeons[9].isAccessible, "lantern") && items.mirror) {
                    return "glitched";
                } else {
                    return "unavailable";
                }
            case "owg":
                if (items.hammer && items.mirror && regions.darkEastDeathMountain()) {
                    return "available";
                } else if (items.hammer && items.mirror && doableWith(regions.darkEastDeathMountain, "lantern")) {
                    return "glitched";
                } else {
                    return "unavailable";
                }
            case "major":
                if (items.hammer && items.mirror && regions.eastDeathMountain()) {
                    return "available";
                } else {
                    return "unavailable";
                }
        }
    }
};

chests[5] = {
    name: "Tavern",
    x: "8.1%",
    y: "57.8%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW()) {
                return "available";
            } else if (regions.invertedLW() && items.mirror) {
                return "glitched";
            } else if (items.moonpearl && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
	    return "available";
    }
};

chests[6] = {
    name: "Chicken House",
    hint: "<img src='images/bomb.png' class='mini'>",
    x: "4.4%",
    y: "54.2%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW()) {
                return "available";
            } else if (items.moonpearl && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
	    return "available";
    }
};

chests[7] = {
    name: "Bombable Hut",
    hint: "<img src='images/bomb.png' class='mini'>",
    x: "55.4%",
    y: "57.8%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            return "available";
        }
		var isAccessible = true;
        if (logic === "owg") {
            isAccessible = items.moonpearl;
        } else if (logic === "major") {
            isAccessible = items.moonpearl || items.bottle;            
        }
        if (regions.northWestDarkWorld() && isAccessible) {
            return "available";
        } else if (considerAga() && doableWith(regions.northWestDarkWorld, "agahnim") && isAccessible) {
            return "aga";
        } else {
            return "unavailable";
        }
    }
};

chests[8] = {
    name: "C House",
    x: "60.8%",
    y: "47.9%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            return "available";
        }
        var isAccessible = true;
        if (logic === "owg") {
            isAccessible = items.moonpearl || items.mirror;
        } else if (logic === "major") {
            isAccessible = items.moonpearl || items.mirror || items.bottle;            
        }
        if (regions.northWestDarkWorld() && isAccessible) {
            return "available";
        } else if (considerAga() && doableWith(regions.northWestDarkWorld, "agahnim") && isAccessible) {
            return "aga";
        } else {
            return "unavailable";
        }
    }
};

chests[9] = {
    name: "Aginah's Cave",
    hint: "<img src='images/bomb.png' class='mini'>",
    x: "10.0%",
    y: "82.6%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW()) {
                return "available";
            } else if (items.moonpearl && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
		return "available";
    }
};

chests[10] = {
    name: "Mire Shed",
    hint: "(2)",
    x: "51.7%",
    y: "79.5%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (regions.mire()) {
                return "available";
            } else if (considerAga() && doableWith(regions.mire, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
		if (regions.mire()) {
            switch (logic) {
                case "nmg":
                    if (items.moonpearl) {
                        return "available";
                    } else if (items.mirror) {
                        return "glitched";
                    } else {
                        return "unavailable";
                    }
                case "owg":
                    if (items.moonpearl || items.mirror) {
                        return "available";
                    } else {
                        return "unavailable";
                    }
                case "major":
                    return "available";
            }
        } else if (logic === "owg" && considerAga() && doableWith(regions.mire, "agahnim") && (items.moonpearl || items.mirror)) {
            return "aga";
        } else {
            return "unavailable";
        }
    }
};

chests[11] = {
    name: "Super Bunny Cave",
    hint: "(2) : Don't need <img src='images/moonpearl.png' class='mini'>",
    x: "92.8%",
    y: "14.7%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (regions.invertedEastDWDM()) {
                return "available";
            } else if (doableWith(regions.invertedEastDWDM, "lantern")) {
                return "glitched";
            } else {
                return "unavailable";
            }
        }
        switch(logic) {
            case "nmg":
                var glitchList = [];
                glitchList.push("moonpearl");
                glitchList.push("lantern");
                if (regions.darkEastDeathMountain()) {
                    return "available";
                } else if (doableWith(regions.darkEastDeathMountain, glitchList)) {
                    return "glitched";
                } else {
                    return "unavailable";
                }
            case "owg":
                if (regions.darkEastDeathMountain()) {
                    return "available";
                } else {
                    return "unavailable";
                }
            case "major":
                if ((items.moonpearl || items.bottle) || items.glove === 2 || items.hammer || items.mirror) {
                    return "available";
                } else {
                    return "unavailable";
                }
        }
        
    }
};

chests[12] = {
    name: "Sahasrahla's Hut",
    hint: "(3) <img src='images/bomb.png' class='mini'>/<img src='images/boots.png' class='mini'>",
    x: "40.7%",
    y: "41.4%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW()) {
                return "available";
            } else if (items.moonpearl && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
	    return "available";
    }
};

chests[13] = {
    name: "Spike Cave",
    x: "78.6%",
    y: "14.9%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (regions.westDeathMountain() && items.hammer && items.glove) {
                if ((items.cape && items.bottle) || items.byrna) {
                    return "available";
                } else {
                    return "glitched";
                }
            } else if (doableWith(regions.westDeathMountain, "lantern")
                && items.hammer && items.glove) {
                return "glitched";
            } else {
                return "unavailable";
            }
        }
        var isAccessible = items.hammer && items.glove;
        var isClearable = (items.cape || items.byrna);
        if (regions.darkWestDeathMountain()) {
            if (isAccessible) {
                if (isClearable) {
                    return "available";
                } else {
                    return "possible";
                }
            } else {
                return "unavailable";
            }      
        } else if (doableWith(regions.darkWestDeathMountain, "lantern")) {
            return isAccessible ? "glitched" : "unavailable";
        } else {
            return "unavailable";
        }
    }
};

chests[14] = {
    name: "Kakariko Well",
    hint: "(4 + <img src='images/bomb.png' class='mini'>)",
    x: "1.7%",
    y: "41.0%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW()) {
                return "available";
            } else if (regions.invertedLW()) {
                return "glitched"; 
            } else if (items.moonpearl && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
	    return "available";
    }
};

chests[15] = {
    name: "Thieve's Hut",
    hint: "(4 + <img src='images/bomb.png' class='mini'>)",
    x: "6.4%",
    y: "41.0%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (regions.invertedLW() && items.moonpearl) {
                return "available";
            } else if (regions.invertedLW() && items.mirror) {
                return "glitched";
            } else if (items.moonpearl && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
	    return "available";
    }
};

chests[16] = {
    name: "Hype Cave!",
    hint: "<img src='images/bomb.png' class='mini'> (NPC + 4 <img src='images/bomb.png' class='mini'>)",
    x: "80.0%",
    y: "77.1%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            return "available";
        }
        if (regions.SouthDarkWorld()) {
            return "available";
        } else if (considerAga() && doableWith(regions.SouthDarkWorld, "agahnim")) {
            return "aga";
        } else {
            return "unavailable";
        }
    }
};

chests[17] = {
    name: "Death Mountain East",
    hint: "(5 + 2 <img src='images/bomb.png' class='mini'>)",
    x: "41.4%",
    y: "17.1%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (regions.invertedEastDM() && items.moonpearl) {
                return "available";
            } else if (doableWith(regions.invertedEastDM, "lantern")) {
                return "glitched";
            } else {
                return "unavailable";
            }
        }
        if (regions.eastDeathMountain()) {
            return "available";
        } else if (doableWith(regions.eastDeathMountain, "lantern")) {
            return "glitched";
        } else {
            return "unavailable";
        }
    }
};

chests[18] = {
    name: "Bonk Rocks",
    hint: "<img src='images/boots.png' class='mini'>",
    x: "19.5%",
    y: "29.3%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.boots && items.moonpearl && regions.invertedLW()) {
                return "available";
            } else if (items.boots && items.moonpearl && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        if (items.boots)
            return "available";
        return "unavailable";

    }
};

chests[19] = {
    name: "Minimoldorm Cave",
    hint: "(NPC + 4) <img src='images/bomb.png' class='mini'>",
    x: "32.6%",
    y: "93.4%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW()) {
                return "available";
            } else if (items.moonpearl && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
	    return "available";
    }
};

chests[20] = {
    name: "Ice Rod Cave",
    hint: "<img src='images/bomb.png' class='mini'>",
    x: "44.7%",
    y: "76.9%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW()) {
                return "available";
            } else if (items.moonpearl && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
	    return "available";
    }
};

chests[21] = {
    name: "Hookshot Cave (bottom chest)",
    hint: "<img src='images/hookshot.png' class='mini'>/<img src='images/boots.png' class='mini'>",
    x: "91.6%",
    y: "8.6%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (regions.invertedEastDWDM() && items.glove && (items.hookshot || items.boots)) {
                return "available";
            } else if (doableWith(regions.invertedEastDWDM, "lantern") 
                && items.glove && (items.hookshot || items.boots)) {
                return "glitched";
            } else {
                return "unavailable";
            }
        }
        switch(logic) {
            case "nmg":
                if (regions.darkEastDeathMountain() && (items.hookshot || items.boots)) {                    
                    return "available";                    
                } else if (doableWith(regions.darkEastDeathMountain, "lantern") && (items.hookshot || items.boots)) {
                    return "glitched";
                } else {
                    return "unavailable";
                }
            case "owg":
                if (regions.darkEastDeathMountain() && items.moonpearl && items.glove && (items.hookshot || items.boots)) {                    
                    return "available";                    
                } else {
                    return "unavailable";
                }
            case "major":
                if (((items.mirror && (items.moonpearl || items.bottle || items.glove === 2)) ||
                    ((items.moonpearl || items.bottle) && items.glove)) && (items.hookshot || items.boots)) {
                    return "available";
                } else {
                    return "unavailable";
                }
        }
    }
};

chests[22] = {
    name: "Hookshot Cave (3 top chests)",
    hint: "<img src='images/hookshot.png' class='mini'>",
    x: "91.6%",
    y: "3.4%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (regions.invertedEastDWDM() && items.glove && items.hookshot) {
                return "available";
            } else if (doableWith(regions.invertedEastDWDM, "lantern") 
                && items.glove && (items.hookshot || items.boots)) {
                return "glitched";
            } else {
                return "unavailable";
            }
        }
        switch(logic) {
            case "nmg":
                if (regions.darkEastDeathMountain() && items.hookshot ) {                    
                    return "available";                    
                } else if ((regions.darkEastDeathMountain() || (doableWith(regions.darkEastDeathMountain, "lantern"))) 
                            && (items.hookshot || items.boots)) {
                    return "glitched";                    
                } else {
                    return "unavailable";
                }
            case "owg":
                if (regions.darkEastDeathMountain() && items.moonpearl && items.glove && items.hookshot) {                    
                    return "available";                    
                } else if ((regions.darkEastDeathMountain() || (doableWith(regions.darkEastDeathMountain, "lantern"))) 
                            && items.moonpearl && items.glove && items.hookshot) {
                    return "glitched";                    
                } else {
                    return "unavailable";
                }
            case "major":
                var isAccessible = ((items.mirror && (items.moonpearl || items.bottle || items.glove === 2)) ||
                    ((items.moonpearl || items.bottle) && items.glove));
                if (isAccessible && items.hookshot) {
                    return "available";
                } else if (isAccessible && items.boots) {
                    return "glitched";
                } else {
                    return "unavailable";
                }
        }
    }
};

chests[23] = {
    name: "Chest Game",
    hint: "(Pay 30 rupees)",
    x: "52.1%",
    y: "46.4%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            return "available";
        }
        var isAccessible = true;
        if (logic === "owg") {
            isAccessible = items.moonpearl || items.mirror;
        } else if (logic === "major") {
            isAccessible = items.moonpearl || items.mirror || items.bottle;            
        }
        if (regions.northWestDarkWorld() && isAccessible) {
            return "available";
        } else if (considerAga() && doableWith(regions.northWestDarkWorld, "agahnim") && isAccessible) {
            return "aga";
        } else {
            return "unavailable";
        }
    }
};

chests[24] = {
    name: "Bottle Vendor",
    hint: "(Pay 100 rupees)",
    x: "4.5%",
    y: "46.8%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (regions.invertedLW()) {
                return "available";
            } else if (considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
	    return "available";
    }
};

chests[25] = {
    name: "Sahasrahla",
    hint: "<img src='images/pendant0.png' class='mini'>",
    x: "40.7%",
    y: "46.7%",
    isOpened: false,
    isAvailable: function(){
		for(var k=0; k<10; k++)
            if(prizes[k]==3 && items["boss"+k]==2) {
                if (mode === 'inverted') {
                    if (regions.invertedLW()) {
                        return "available";
                    } else if (considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                        return "aga";
                    } else {
                        return "unavailable";
                    }
                }
                return "available";
            }
		return "unavailable";
    }
};

chests[26] = {
    name: "Ol' Stumpy",
    x: "65.5%",
    y: "68.6%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            return "available";
        }
        if (regions.SouthDarkWorld()) {
            return "available";
        } else if (considerAga() && doableWith(regions.SouthDarkWorld, "agahnim")) {
            return "aga";
        } else {
            return "unavailable";
        }
    }
};

chests[27] = {
    name: "Sick Kid",
    hint: "Distract him with <img src='images/bottle.png' class='mini'> so that you can rob his family!",
    x: "7.8%",
    y: "52.1%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.bottle && regions.invertedLW()) {
                return "available";
            } else if (items.bottle && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        if (items.bottle) {
            return "available";
        } else {
            return "unavailable";
        }        
    }
};

chests[28] = {
    name: "Purple Chest",
    hint: "(Reunite the Hammer Brothers and show the Purple Chest to Gary)",
    x: "65.2%",
    y: "52.2%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if ((items.glove === 2 || items.mirror) && regions.invertedLW()) {
                return "available";
            } else if (items.mirror && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        var isAccessible;
        switch (logic) {
            case "nmg":
                isAccessible = items.glove === 2 && items.moonpearl && regions.northWestDarkWorld();
                break;
            case "owg":
                isAccessible = chests[60].isAvailable() === "available" && (items.moonpearl && ((items.glove === 2 && regions.northWestDarkWorld()) ||
                                (items.boots && regions.northEastDarkWorld())));
            case "major":
                isAccessible = items.mirror && (items.bottle || items.moonpearl) &&
                                (items.glove === 2 || items.flippers || items.hammer || regions.northEastDarkWorld());
        }
        if (isAccessible) {
            return "available";
        } else {
            return "unavailable";
        }
    }
};

chests[29] = {
    name: "Hobo",
    hint: "<img src='images/flippers.png' class='mini'>",
    x: "35.4%",
    y: "69.7%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW()) {
                if (items.flippers) {
                    return "available";
                } else {
                    return "glitched";
                }
            } else if (items.moonpearl && items.flippers && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        if (logic === "nmg") {
            if (items.flippers) {
                return "available";
            } else {
                return "glitched";
            }
        } else {
            return "available";
        }
    }
};

chests[30] = {
    name: "Ether Tablet",
    hint: "<img src='images/sword2.png' class='mini'><img src='images/book.png' class='mini'>",
    x: "21.0%",
    y: "3.0%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (regions.invertedEastDM() && items.moonpearl && items.book && items.hammer) {
                if (items.sword >= 2 || (swords === "swordless" && items.hammer)) {
                    return "available";
                } else {
                    return "possible";
                }
            } else if (doableWith(regions.invertedEastDM, "lantern")
                && (items.moonpearl && items.book && items.hammer)) {
                    return "glitched";
            } else {
                return "unavailable";
            }
        }
        if (logic !== "major") {
            if (items.book) {
                if (regions.westDeathMountain() && (items.mirror || (items.hammer && items.hookshot))) {
                    if (items.sword >= 2 || (swords === "swordless" && items.hammer)) {
                        return "available";
                    } else {
                        return "possible";
                    }
                } else if (doableWith(regions.westDeathMountain, "lantern") 
                        && (items.mirror || (items.hammer && items.hookshot))) {
                    return "glitched";
                }
            }           
        } else {
            if (regions.westDeathMountain() && items.book) {
                if (items.sword >= 2 || (swords === "swordless" && items.hammer)) {
                    return "available";
                } else {
                    return "possible";
                }
            }
        }
        return "unavailable";
    }
};

chests[31] = {
    name: "Bombos Tablet",
    hint: "<img src='images/mirror.png' class='mini'><img src='images/sword2.png' class='mini'><img src='images/book.png' class='mini'>",
    x: "11.0%",
    y: "92.2%",
    isOpened: false,
    isAvailable: function(){        
        if (mode === 'inverted') {
            if (regions.invertedLW() && items.book) {
                if (items.sword >= 2 || (items.hammer && swords === "swordless")) {
                    return "available";
                } else {
                    return "possible";
                }
            } else if (items.book && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                if (items.sword >= 2 || (items.hammer && swords === "swordless")) {
                    return "aga";
                }                
            } 
            return "unavailable";            
        }
        switch (logic) {
            case "nmg":
                if (items.book && items.mirror && regions.SouthDarkWorld()) {
                    if (items.sword >= 2 || (swords === "swordless" && items.hammer)) {
                        return "available";
                    } else {
                        return "possible";
                    }
                } else if (items.book && items.mirror && considerAga() && doableWith(regions.SouthDarkWorld)) {
                    return "aga";
                } else {
                    return "unavailable";
                }
            case "owg":
                if (items.book && (items.boots || (items.mirror && regions.SouthDarkWorld()))) {
                    if (items.sword >= 2 || (swords === "swordless" && items.hammer)) {
                        return "available";
                    } else {
                        return "possible";
                    }
                } else if (items.book && items.mirror && considerAga() && doableWith(regions.SouthDarkWorld)) {
                    return "aga";
                } else {
                    return "unavailable";
                }
            case "major":
                if (items.book) {
                    if (items.sword >= 2 || (swords === "swordless" && items.hammer)) {
                        return "available";
                    } else {
                        return "possible";
                    }
                } else {
                    return "unavailable";
                }
        }
    }
};

chests[32] = {
    name: "Catfish",
    x: "96.0%",
    y: "17.2%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.glove && regions.invertedNEDW()) {
                return "available";
            } else if (items.glove && considerAga() && doableWith(regions.invertedNEDW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        switch (logic) {
            case "nmg":
                if (regions.northEastDarkWorld() && items.moonpearl && items.glove) {
                    return "available";
                } else if (considerAga() && doableWith(regions.northEastDarkWorld, "agahnim") && items.moonpearl && items.glove) {
                    return "aga";
                } else {
                    return "unavailable";
                }
            case "owg":
                if (regions.northEastDarkWorld() && items.moonpearl && items.glove) {
                    return "available";
                } else if (doableWith(regions.northEastDarkWorld, "lantern") && items.moonpearl && items.glove) {
                    return "glitched";
                } else if (considerAga() && doableWith(regions.northEastDarkWorld, "agahnim") && items.moonpearl && items.glove) {
                    return "aga";                
                } else {
                    return "unavailable";
                }
            case "major":
                if (regions.northEastDarkWorld()) {
                    return "available";
                } else {
                    return "unavailable";
                }
        }
    }
};

chests[33] = {
    name: "King Zora",
    hint: "(Pay 500 rupees)",
    x: "47.7%",
    y: "12.1%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW()) {
                if (items.glove || items.flippers) {
                    return "available";
                } else {
                    return "glitched";
                }
            } else if (items.moonpearl && (items.glove || items.flippers) && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        if (logic === "nmg") {
            if (items.flippers || items.glove) {
                return "available";
            } else {
                return "glitched";
            }
        } else {
            return "available";
        }
    }
};

chests[34] = {
    name: "Lost Old Man",
    x: "20.8%",
    y: "20.4%",
    isOpened: false,
    isAvailable: function(){
        if (regions.westDeathMountain() && items.lantern) {
            return "available";        
        } else if (doableWith(regions.westDeathMountain, "lantern")) {
            return "glitched";
        } else {
            return "unavailable";
        }
    }
};

chests[35] = {
    name: "Witch",
    hint: "Give her <img src='images/allpowder1.png' class='mini'>",
    x: "40.8%",
    y: "32.5%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.allpowder % 2 === 1 && items.moonpearl && regions.invertedLW()) {
                return "available";
            } else if (items.allpowder % 2 === 1 && items.moonpearl && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        if (items.allpowder % 2 == 1) {
            return "available";
        } else {
            return "unavailable";
        }
    }
};

chests[36] = {
    name: "Forest Hideout",
    x: "9.4%",
    y: "13.0%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW()) {
                return "available";
            } else if (regions.invertedLW()) {
                return "possible";
            } else if (items.moonpearl && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
		return "available";
    }
};

chests[37] = {
    name: "Lumberjack Tree",
    hint: "<img src='images/agahnim.png' class='mini'><img src='images/boots.png' class='mini'>",
    x: "15.1%",
    y: "7.6%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && items.boots && items.agahnim && regions.invertedLW()) {
                return "available";
            } else if (regions.invertedLW()) {
                return "possible";
            } else if (items.moonpearl && items.boots && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        if (logic !== "major") {
            if (items.agahnim && items.boots) {
                return "available";
            } else if (considerAga() && items.boots) {
                return "aga";
            } else {
                return "possible";
            }
        } else {
            if ((items.boots && items.sword) || (items.agahnim && items.boots)) {
                return "available";
            } else if (considerAga() && items.boots) {
                return "aga";
            } else {
                return "possible";
            }
        }
    }
};

chests[38] = {
    name: "Spectacle Rock Cave",
    x: "24.3%",
    y: "14.8%",
    isOpened: false,
    isAvailable: function(){
        if (regions.westDeathMountain()) {
            return "available";
        } else if (doableWith(regions.westDeathMountain, "lantern")) {
            return "glitched";
        } else {
            return "unavailable";
        }
    }
};

chests[39] = {
    name: "South of Grove",
    hint: "<img src='images/mirror.png' class='mini'>",
    x: "14.1%",
    y: "84.1%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW()) {
                return "available";
            } else if (items.moonpearl && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        if (logic !== "major") {
            if (logic === "owg" ? items.boots : false || (items.mirror && regions.SouthDarkWorld())) {
                return "available";
            } else if (items.mirror && considerAga() && doableWith(regions.SouthDarkWorld, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        } else {
            return "available";
        }
    }
};

chests[40] = {
    name: "Graveyard Cliff Cave",
    hint: "<img src='images/mirror.png' class='mini'>",
    x: "28.1%",
    y: "27.0%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW()) {
                return "available";
            } else if (items.moonpearl && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        if (logic !== "major") {
            if (logic === "owg" ? items.boots : false || (items.mirror && items.moonpearl && regions.northWestDarkWorld())) {
                return "available";
            } else if (items.mirror && items.moonpearl && considerAga() && doableWith(regions.northWestDarkWorld, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        } else {
            return "available";
        }
    }
};

chests[41] = {
    name: "Checkerboard Cave",
    hint: "<img src='images/mirror.png' class='mini'>",
    x: "8.8%",
    y: "77.3%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && items.glove && regions.invertedLW()) {
                return "available";
            } else if (items.moonpearl && items.glove && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        switch (logic) {
            case "nmg":
                if (items.allflute >= 2 && items.glove === 2 && items.mirror) {
                    return "available";
                } else {
                    return "unavailable";
                }
            case "owg":
                if (items.glove && (items.boots || (items.mirror && regions.mire()))) {
                    return "available";
                } else if (items.glove && items.mirror && doableWith(regions.mire, "lantern")) {
                    return "glitched";
                } else if (items.glove && items.mirror && considerAga() && doableWith(regions.mire, "agahnim")) {
                    return "aga";
                } else {
                    return "unavailable";
                }
            case "major":
                if (items.glove) {
                    return "available";
                } else {
                    return "unavailable";
                }
        }
    }
};

chests[42] = {
    name: "Hammer Pegs",
    hint: "<img src='images/hammer.png' class='mini'><img src='images/hammer.png' class='mini'><img src='images/hammer.png' class='mini'><img src='images/hammer.png' class='mini'><img src='images/hammer.png' class='mini'><img src='images/hammer.png' class='mini'><img src='images/hammer.png' class='mini'><img src='images/hammer.png' class='mini'>!!!!!!!!",
    x: "65.8%",
    y: "60.1%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.hammer && (items.glove === 2 || (items.mirror && regions.invertedLW() && items.glove))) {
                return "available";
            } else if (items.mirror && items.glove && items.hammer && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        var isAccessible = true;
        if (logic === "nmg") {
            isAccessible = items.glove === 2 && items.hammer;
        } else if (logic === "owg") {
            isAccessible = items.moonpearl && items.hammer && items.glove;
        } else if (logic === "major") {
            isAccessible = items.hammer && (items.moonpearl || items.bottle);            
        }
        if (regions.northWestDarkWorld() && isAccessible) {
            return "available";
        } else if (considerAga() && doableWith(regions.northWestDarkWorld, "agahnim") && isAccessible) {
            return "aga";
        } else {
            return "unavailable";
        }
    }
};

chests[43] = {
    name: "Library",
    hint: "<img src='images/boots.png' class='mini'>",
    x: "7.7%",
    y: "65.9%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && items.boots && regions.invertedLW()) {
                return "available";
            } else if (regions.invertedLW()) {
                return "possible";
            } else if (items.moonpearl && items.boots && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        if (items.boots) {
            return "available";
        } else {
            return "possible";
        }
    }
};

chests[44] = {
    name: "Mushroom Location",
    x: "6.2%",
    y: "8.6%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW()) {
                return "available";
            } else if (regions.invertedLW()) {
                return "possible";            
            } else if (items.moonpearl && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
		return "available";
    }
};

chests[45] = {
    name: "Spectacle Rock",
    hint: "<img src='images/mirror.png' class='mini'>",
    x: "25.4%",
    y: "8.5%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (regions.invertedEastDM() && items.moonpearl && items.hammer) {
                return "available";
            } else if (doableWith(regions.invertedEastDM, "lantern")
                && items.moonpearl && items.hammer) {
                return "glitched";
            } else if (doableWith(regions.westDeathMountain, "lantern")) {
                return "possible";
            } else {
                return "unavailable";
            }
        }
        var isAccessible = true;
        if (logic === "nmg") {
            isAccessible = items.mirror;
        } else if (logic === "owg") {
            isAccessible = items.mirror || items.boots;
        }

        if (regions.westDeathMountain()) {
            if (isAccessible) {
                return "available";
            } else {
                return "possible";
            }
        } else if (doableWith(regions.westDeathMountain, "lantern")) {
            return "glitched";
        } else {
            return "unavailable";
        }
    }
};

chests[46] = {
    name: "Floating Island",
    hint: "<img src='images/mirror.png' class='mini'>",
    x: "40.2%",
    y: "3.0%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (regions.invertedEastDM()) {
                return "available";
            } else if (doableWith(regions.invertedEastDM, "lantern")) {
                return "glitched";
            } else {
                return "unavailable";
            }
        }
        var isAccessible = true;
        if (logic === "nmg") {
            isAccessible = items.mirror && items.moonpearl && items.glove === 2;
        } else if (logic === "owg") {
            isAccessible = items.boots || (items.mirror && items.moonpearl && items.glove && doableWith(regions.darkEastDeathMountain, "lantern"));
        }

        if (regions.eastDeathMountain()) {
            if (isAccessible) {
                return "available";
            } else {
                return "possible";
            }
        } else if (doableWith(regions.eastDeathMountain, "lantern")) {
            return "glitched";
        } else {
            return "unavailable";
        }
	}
};

chests[47] = {
    name: "Race Minigame",
    hint: "<img src='images/bomb.png' class='mini'>/<img src='images/boots.png' class='mini'>",
    x: "1.8%",
    y: "69.8%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW()) {
                return "available";
            } else if (regions.invertedLW()) {
                return "possible";
            } else if (items.moonpearl && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
		return "available";
    }
};

chests[48] = {
    name: "Desert West Ledge",
    hint: "<img src='images/book.png' class='mini'>/<img src='images/mirror.png' class='mini'>",
    x: "1.5%",
    y: "91.0%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && items.book && regions.invertedLW()) {
                return "available";
            } else if (items.book && regions.invertedLW()) {
                return "glitched";
            } else if (regions.invertedLW()) {
                return "possible";
            } else if (items.moonpearl && items.book && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        if (dungeons[1].isAccessible()) {
            return "available";
        } else if (doableWith(dungeons[1].isAccessible, "lantern")) {
            return "glitched";        
        } else if (considerAga() && doableWith(dungeons[1].isAccessible, "agahnim")) {
            return "aga";
        } else {
            return "possible";
        }
    }
};

chests[49] = {
    name: "Lake Hylia Island",
    hint: "<img src='images/mirror.png' class='mini'>",
    x: "36.1%",
    y: "82.9%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW() && items.flippers) {
                return "available";
            } else if (items.moonpearl && regions.invertedLW()) {
                return "glitched";
            } else if (regions.invertedLW()) {
                return "possible";
            } else if (items.moonpearl && items.flippers && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        switch (logic) {
            case "nmg":
                if (items.flippers && items.moonpearl && items.mirror && (regions.SouthDarkWorld() || regions.northEastDarkWorld())) {
                    return "available";
                } else if (considerAga() && items.flippers && items.moonpearl && items.mirror && (doableWith(regions.SouthDarkWorld, "agahnim") || doableWith(regions.northEastDarkWorld, "agahnim"))) {
                    return "aga";
                } else if (items.agahnim && items.flippers && items.mirror) {
                    return "glitched";
                } else {
                    return "possible";
                }
            case "owg":
                if (items.boots || (items.flippers && items.mirror && ((items.moonpearl && regions.SouthDarkWorld()) || regions.northEastDarkWorld()))) {
                    return "available";
                } else if (considerAga() && items.flippers && items.mirror && (items.moonpearl && doableWith(regions.SouthDarkWorld, "agahnim") || doableWith(regions.northEastDarkWorld, "agahnim"))) {
                    return "aga";
                } else {
                    return "possible";
                }
            case "major": // TODO check facts
                return "available";
        }
	}
};

chests[50] = {
    name: "Bumper Cave",
    hint: "<img src='images/cape.png' class='mini'>",
    x: "67.1%",
    y: "15.2%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW() && items.glove && items.cape && items.mirror) {
                return "available";
            } else if (items.moonpearl && items.glove && items.cape && items.mirror && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "possible";
            }
        }
        var isAccessible = true;
        if (logic === "nmg") {
            isAccessible = items.glove && items.cape;
        } else if (logic === "owg") {
            isAccessible = items.moonpearl && (items.boots || (items.glove && items.cape));
        } else if (logic === "major") {
            isAccessible = items.moonpearl || items.bottle;            
        }
        if (regions.northWestDarkWorld() && isAccessible) {
            return "available";
        } else if (regions.northWestDarkWorld()) {
            return "possible";        
        } else if (considerAga() && doableWith(regions.northWestDarkWorld, "agahnim")) {
            return "aga";
        } else {
            return "unavailable";
        }
    }
};

chests[51] = {
    name: "Pyramid",
    x: "79.0%",
    y: "43.5%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (regions.invertedNEDW()) {
                return "available";
            } else if (items.mirror && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        if (regions.northEastDarkWorld()) {
            return "available";
        } else if (doableWith(regions.northEastDarkWorld, "lantern")) {
            return "glitched";
        } else if (considerAga() && doableWith(regions.northEastDarkWorld, "agahnim")) {
            return "aga";
        } else {
            return "unavailable";
        }
    }
};

chests[52] = {
    name: "Digging Game",
    hint: "(Pay 80 rupees)",
    x: "52.9%",
    y: "69.2%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            return "available";
        }
		if (regions.SouthDarkWorld()) {
            return "available";
        } else if (considerAga() && doableWith(regions.SouthDarkWorld, "agahnim")) {
            return "aga";
        } else {
            return "unavailable";
        }
    }
};

chests[53] = {
    name: "Zora River Ledge",
    hint: "<img src='images/flippers.png' class='mini'>",
    x: "47.7%",
    y: "17.3%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW()) {
                if (items.flippers) {
                    return "available";
                } else if (items.boots) {
                    return "glitched";
                } else {
                    return "possible";
                }
            } else if (items.moonpearl && items.flippers && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        if (logic === "nmg") {
            if (items.flippers) {
                return "available";
            } else {
                return "possible";
            }
        } else {
            if (items.flippers || (items.boots && items.moonpearl)) {
                return "available";
            } else {
                return "possible";
            }
        }
    }
};

chests[54] = {
    name: "Shovel Item",
    hint: "<img src='images/allflute1.png' class='mini'>",
    x: "14.4%",
    y: "66.2%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && items.allflute % 2 === 1 && regions.invertedLW()) {
                return "available";
            } else if (items.moonpearl && items.allflute % 2 === 1 && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
		if (items.allflute % 2 === 1) {
            return "available";
        } else {
            return "unavailable";
        }		
	}
};

chests[55] = {
    name: "Fall to Escape Sewer",
    hint: "(3) <img src='images/glove.png' class='mini'> + <img src='images/bomb.png' class='mini'>/<img src='images/boots.png' class='mini'>",
    x: "26.8%",
    y: "32.4%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW() && (items.glove || (variation === "retro" && items.lantern))) {
                return "available";
            } else if (items.moonpearl && regions.invertedLW() && items.lantern) {
                return "possible";
            } else if (regions.invertedLW()) {
                return "glitched";
            } else if (items.moonpearl && items.glove && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        if (mode === "standard") {
            return "available";
        } else {
            if (items.glove || (variation === "retro" && items.lantern)) {
                return "available";
            } else if (variation === "retro") {
                return "glitched";
            } else {
                return "possible";
            }
        }	    
    }
};

chests[56] = {
    name: "Castle Secret Entrance",
    x: "29.8%",
    y: "41.8%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW()) {
                return "available";
            } else if (items.moonpearl && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
		return "available";
    }
};

chests[57] = {
    name: "Escape",
    hint: "(3)",
    x: "24.9%",
    y: "53%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW()) {
                return "available";
            } else if (regions.invertedLW()) {
                return "glitched";
            } else if (items.moonpearl && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        return "available";
    }
};

chests[58] = {
    name: "Sanctuary",
    x: "23.0%",
    y: "28.0%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW()) {
                return "available";
            } else if (items.moonpearl && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
		return "available";
    }
};

chests[59] = {
    name: "Magic Bat Cave",
    hint: "<img src='images/hammer.png' class='mini'>/<img src='images/mirror.png' class='mini'> + <img src='images/allpowder2.png' class='mini'>",
    x: "16.0%",
    y: "58.0%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW() && items.hammer && items.allpowder >= 2) {
                return "available";
            } else if (items.moonpearl && items.hammer && items.allpowder >= 2 && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        var isAccessible;
        switch (logic) {
            case "nmg":
                isAccessible = items.allpowder >= 2 && (items.hammer || (items.moonpearl && items.mirror && items.glove === 2));
                break;
            case "owg":
                isAccessible = items.allpowder >= 2 
                    && (items.hammer 
                        || items.boots 
                        || (items.moonpearl && items.mirror && items.glove === 2 
                            && regions.northWestDarkWorld()));
                break;
            case "major":
                isAccessible = items.allpowder >= 2 && (items.hammer || items.mirror);
                break;
        }
        if (isAccessible) {
            return "available";
        } else {
            return "unavailable";
        }
    }
};

chests[60] = {
    name: "Blacksmiths",
    x: "15.2%",
    y: "51.8%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if ((items.glove === 2 || items.mirror) && regions.invertedLW()) {
                return "available";
            } else if ((items.glove === 2 || items.mirror) && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        switch (logic) {
            case "nmg":
                if (items.glove === 2 && regions.northWestDarkWorld()) {
                    return "available";
                } else {
                    return "unavailable";
                }
            case "owg":
                if (items.moonpearl && (items.glove === 2 || (items.boots && items.mirror))) {
                    return "available";
                } else {
                    return "unavailable";
                }
            case "major":
                if (items.mirror && (items.bottle || items.moonpearl)) {
                    return "available";                    
                } else {
                    return "unavailable";
                }
        }
    }
};

chests[61] = {
    name: "Fat Fairy",
    hint: "- Buy OJ bomb from Dark Link's House after <img src='images/crystal0.png' class='mini'>5 <img src='images/crystal0.png' class='mini'>6 (2 items)",
    x: "73.5%",
    y: "48.5%",
    isOpened: false,
    isAvailable: function(){ // TODO remake this, but kinda works I guess
		//crystal check
		var crystalCount = 0;
		for(var k=0; k<10; k++)
			if(prizes[k]==2 && items["boss"+k]==2)
				crystalCount++;
        if (mode === 'inverted') {
            if (regions.invertedLW() && crystalCount === 2 && items.mirror) {
                return "available";
            } else if (crystalCount === 2 && items.mirror && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        switch (logic) {
            case "nmg":
            case "owg":
                var requirement = function() {
                    return items.moonpearl && regions.SouthDarkWorld() && (items.hammer || (items.mirror && items.agahnim));
                }
                if (crystalCount === 2 && requirement()) {
                    return "available";
                } else if (crystalCount === 2 && considerAga() && doableWith(requirement, "agahnim")) {
                    return "aga";
                } else {
                    return "unavailable";
                }
            case "major":
                if (items.mirror || (crystalCount === 2 && items.hammer && (items.bottle || items.moonpearl))) {
                    return "available";
                } else {
                    return "unavailable";
                }
        }
    }
};


chests[62] = {
    name: "Master Sword Pedestal",
    hint: "<img src='images/pendant0.png' class='mini'><img src='images/pendant1.png' class='mini'><img src='images/pendant2.png' class='mini'> (can check with <img src='images/book.png' class='mini'>)",
    x: "2.5%",
    y: "3.2%",
    isOpened: false,
    isAvailable: function(){
		var pendantCount = 0;
		for(var k=0; k<10; k++)
			if((prizes[k]==3 || prizes[k]==4) && items["boss"+k]==2) {
                if(++pendantCount==3 && (mode !== "inverted" || (mode === "inverted" && regions.invertedLW() && items.moonpearl)))
					return "available";
            }
				
        if (items.book && (mode !== "inverted" || (mode === "inverted" && regions.invertedLW() && items.moonpearl)))
            return "possible";
        if (mode === "inverted" && items.moonpearl && pendantCount === 3 && considerAga() && doableWith(regions.invertedLW, "agahnim"))
            return "aga";
		return "unavailable";
    }
};

chests[63] = {
    name: "Waterfall Fairy",
    hint: "<img src='images/flippers.png' class='mini'>",
    x: "45%",
    y: "19.3%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (items.moonpearl && regions.invertedLW()) {
                if (items.flippers) {
                    return "available";
                } else if ((items.moonpearl || items.boots)) {
                    return "glitched";
                } else {
                    return "unavailable";
                }
            } else if (items.moonpearl && items.flippers && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        if (logic === "nmg") {
            if (items.flippers) {
                return "available";
            } else if (items.moonpearl || items.boots) {
                return "glitched";
            } else {
                return "unavailable";
            }
        } else {
            if (items.flippers || items.moonpearl) {
                return "available";
            } else {
                return "unavailable";
            }
        }
    }
};

chests[64] = {
   name: "Escape Dark Room Chest",    
    x: "24.9%",
    y: "48%",
    isOpened: false,
    isAvailable: function(){
        if (mode === 'inverted') {
            if (regions.invertedLW()) {
                if (items.moonpearl && items.lantern) {
                    return "available";
                } else {
                    return "glitched";
                }
            } else if (items.moonpearl && items.lantern && considerAga() && doableWith(regions.invertedLW, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        if (mode === "standard") {
            return "available";
        } else {
            if (items.lantern) {
                return "available";
            } else {
                return "glitched";
            }
        }
    }
}

