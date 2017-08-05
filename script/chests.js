var logic = "nmg";
var mode = "standard";
var goal = "ganon";

function considerAga() {
    if (mode !== "swordless") {
        return !items.agahnim && (items.lantern || glitches.darkrooms.agatower) && (items.cape || items.sword >= 2);       
    } else {
        return !items.agahnim && (items.lantern || glitches.darkrooms.agatower) && (items.cape || items.hammer);               
    }    
}

function hasFiresource() {
    return items.firerod || items.lantern;
}

function canMeltThings() {
    return items.firerod || (items.bombos && items.sword);
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

var regions = {  
    westDeathMountain: function(isGlitch) {
        switch (logic) {
            case "nmg":
                return items.allflute >= 2 || (items.glove && items.lantern);
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
		if(items.bow>1 && items.lantern)
			return "available";
        if (items.bow>1 && glitches.darkrooms.eastern)
            return "glitched";
		return "unavailable";
    },
    canGetChest: function(){
		if(items.bow>1 && items.lantern)
			return "available";
        if (items.bow>1 && glitches.darkrooms.eastern)
            return "glitched";
		return "possible";
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
        if(!(this.isAccessible() && (items.glove || logic === "major") && hasFiresource()))
            return "unavailable";
        if(!items.boots)
            return "possible";
        return "available";
		
    },
    canGetChest: function(){
        if (!this.isAccessible())
            return "unavailable";
        if ((items.glove || logic === "major") && hasFiresource() && items.boots && this.isKillable()) {
            return "available";
        }
        return "possible";
    },
    isAccessible: function() {
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
              items.icerod || items.byrna || items.somaria);
    }
};

dungeons[2] = {
    name: "Tower of Hera", // TODO update logic for glitched
    abbrev: "Hera",
    x: "31.0%",
    y: "5.5%",
    image: "boss22.png",
    isBeaten: false,
    isBeatable: function(){
        if (logic !== "major") {
            if (!this.isAccessible()) {
                if (glitches.darkrooms.oldMan && doableWith(this.isAccessible, "lantern") && (items.sword || items.hammer)) {
                    return "glitched";
                } else {
                    return "unavailable";
                }
            } else {
                if (hasFiresource() && (items.sword || items.hammer)) {
                    return "available";
                } else {
                    return "possible";
                }
            }
        } else {
            if (!this.isAccessible) {
                if (glitches.darkrooms.oldMan && doableWith(this.isAccessible, "lantern") && (items.sword || items.hammer)) {
                    return "glitched";
                } else {
                    return "unavailable";
                }
            } else {
                if (hasFiresource() && ((items.sword || items.hammer) || 
                        (items.hookshot && items.flippers && (items.firerod || items.icerod || items.bow > 1)))) {
                    return "available";
                } else {
                    return "possible";
                }
            }
        }
    },
    canGetChest: function(){
        if (logic !== "major") {
            if (!this.isAccessible()) {
                if (glitches.darkrooms.oldMan && doableWith(this.isAccessible, "lantern")) {
                    return "glitched";
                } else {
                    return "unavailable";
                }
            } else {
                if (hasFiresource() && (items.sword || items.hammer)) {
                    return "available";
                } else {
                    return "possible";
                }
            }
        } else {
            if (!this.isAccessible) {
                if (glitches.darkrooms.oldMan && doableWith(this.isAccessible, "lantern")) {
                    return "glitched";
                } else {
                    return "unavailable";
                }
            } else {
                if (hasFiresource() && ((items.sword || items.hammer) || 
                        (items.hookshot && items.flippers && (items.firerod || items.icerod || items.bow > 1)))) {
                    return "available";
                } else {
                    return "possible";
                }
            }
        }
    },
    isAccessible: function() {
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
        
    }            
};

dungeons[3] = {
    name: "Palace of Darkness <img src='images/lantern.png' class='mini'>",
    abbrev: "PoD",
    x: "97.0%",
    y: "40.0%",
    image: "boss32.png",
    isBeaten: false,
    isBeatable: function(){
        if (!this.isAccessible()) {
            if (considerAga() && doableWith(this.isAccessible, "agahnim") && items.bow>1 && items.hammer && (items.lantern || glitches.darkroom)) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        if (logic === "major" && items.bow > 1 && items.hammer) {
            return "available";
        } else if (items.bow > 1 && items.hammer && items.lantern) {
            return "available";
        } else if (items.bow > 1 && items.hammer && glitches.darkrooms.pod) {
            return "glitched";
        } else {
            return "unavailable";
        }
    },
    canGetChest: function(){
        if (!this.isAccessible()) {
            if (considerAga() && doableWith(this.isAccessible, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        if (logic === "major" && items.bow > 1 && items.hammer) {
            return "available";
        }
		if (items.bow>1 && items.hammer && items.lantern) {
            return "available";
        } else if (items.bow>1 && items.hammer && !items.lantern && glitches.darkrooms.pod) {
            return "glitched";
        } else {
            return "possible";
        }        
    },
    isAccessible: function() {
        return items.moonpearl && regions.northEastDarkWorld();
    }
};

dungeons[4] = {
    name: "Swamp Palace <img src='images/mirror.png' class='mini'>",
    abbrev: "SP",
    x: "73.5%",
    y: "91.0%",
    image: "boss42.png",
    isBeaten: false,
    isBeatable: function(){
        if (logic !== "major") {
            if (!this.isAccessible()) {
                if (considerAga() && doableWith(this.isAccessible, "agahnim") && items.hammer && items.hookshot) {
                    return "aga";
                } else {
                    return "unavailable";
                }
            } else if (items.hammer && items.hookshot) {
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
    canGetChest: function(){
        if (!this.isAccessible()) {
            if (considerAga() && doableWith(this.isAccessible, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        }
        if (logic !== "major") {
            if (items.hookshot && items.hammer) {
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
        
    },
    isAccessible: function() {
        if (logic !== "major") {
            return items.moonpearl && items.mirror && items.flippers && regions.SouthDarkWorld();
        } else {
            return (items.flippers && items.mirror && items.moonpearl) || dungeons[8].isAccessible();
        }
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
        if (!this.isAccessible()) {
            if (considerAga() && doableWith(this.isAccessible, "agahnim") && items.firerod && (items.sword || mode === "swordless")) {
                return "aga";
            } else {
                return "unavailable";
            }
        } else {
            if (items.firerod && (items.sword || mode === "swordless")) {
                return "available";
            } else {
                return "unavailable";
            }
        }
    },
    canGetChest: function(){
        if (!this.isAccessible()) {
            if (considerAga() && doableWith(this.isAccessible, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        } else {
            if (items.firerod && (items.sword || mode === "swordless")) {
                return "available";
            } else {
                return "possible";
            }
        }
    },
    isAccessible: function() {
        switch (logic) {
            case "nmg":
                return items.moonpearl && regions.northWestDarkWorld();
            case "owg":
                return regions.northWestDarkWorld();
            case "major":
                return true;
        }
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
    canGetChest: function(){
        if (!this.isAccessible()) {
            if (considerAga() && doableWith(this.isAccessible, "agahnim")) {
                return "aga";
            } else {
                return "unavailable";
            }
        } else {
            if (items.hammer) {
                return "available";
            } else {
                return "possible";
            }
        }
    },
    isAccessible: function() {
        if (logic !== "major") {
            return items.moonpearl && regions.northWestDarkWorld();
        } else {
            return items.moonpearl || items.bottle;
        }
    },
    canKillBoss: function() {
        return items.sword || items.hammer || items.somaria || items.byrna;
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
                if (glitches.fakeflippers) {
                    glitchList.push("flippers");
                }
                if (glitches.bunnyrevival) {
                    glitchList.push("moonpearl");
                }
                if (doableWith(this.isAccessible, glitchList) && (items.hookshot || items.somaria || glitches.ipbj) && items.hammer) {
                    return "glitched";
                } else {
                    return "unavailable";
                }
            } else {
                if ((items.hookshot || items.somaria) && items.hammer) {
                    return "available";
                } else if (glitches.ipbj && items.hammer) {
                    return "glitched";
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
    canGetChest: function(){
        if (logic !== "major") {
            if (!this.isAccessible()) {
                var glitchList = [];
                if (glitches.fakeflippers) {
                    glitchList.push("flippers");
                }
                if (glitches.bunnyrevival) {
                    glitchList.push("moonpearl");
                }
                if (doableWith(this.isAccessible, glitchList)) {
                    return "glitched";
                } else {
                    return "unavailable";
                }
            } else {
                if ((items.hookshot || items.somaria) && items.hammer) {
                    return "available";
                } else if (glitches.ipbj && items.hammer) {
                    return "glitched";
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
        switch (logic) {
            case "nmg":
                return items.moonpearl && items.flippers && items.glove === 2 && canMeltThings();
            case "owg":
                return items.glove === 2 && canMeltThings();
            case "major":
                return items.glove === 2 || (items.mirror && (items.moonpearl || items.bottle));
        }
    }
};

dungeons[8] = {
    name: "Misery Mire <img src='images/medallion0.png' class='mini'><img src='images/lantern.png' class='mini'>",
    abbrev: "MM",
    x: "55.8%",
    y: "82.9%",
    image: "boss82.png",
    isBeaten: false,
    isBeatable: function(){
		var canClear;
        if (logic !== "major") {
            canClear = items.somaria && items.lantern;
        } else {
            canClear = items.somaria || items.sword || items.hammer || (items.hookshot && items.flippers && (items.firerod || items.icerod || items.bow > 1))
        }
		if (!this.isAccessible()) {
            return "unavailable";
        } else if (canClear) {
            return "available";
        } else if (logic !== "major" && items.somaria && hasFiresource() && glitches.darkrooms.mire) {
            return "glitched";
        } else {
            return "unavailable";
        }
    },
    canGetChest: function(){
        var canClear;
        if (logic !== "major") {
            canClear = items.somaria && items.lantern;
        } else {
            canClear = items.somaria || items.sword || items.hammer || (items.hookshot && items.flippers && (items.firerod || items.icerod || items.bow > 1))
        }
		if (!this.isAccessible()) {
            return "unavailable";
        } else if (canClear) {
            return "available";
        } else if (logic !== "major" && items.somaria && hasFiresource() && glitches.darkrooms.mire) {
            return "glitched";
        } else {
            return "possible";
        }
    },
    isAccessible: function() {
        var hasMedallion = medallionCheck(0) && (items.sword || mode === "swordless");
        switch (logic) {
            case "nmg":
                return hasMedallion && items.glove === 2 && items.moonpearl && items.allflute > 1 && (items.boots || items.hookshot);
            case "owg":
                return hasMedallion && items.moonpearl && regions.mire() && (items.boots || items.hookshot);
            case "major":
                return hasMedallion && (items.moonpearl || items.bottle) && (items.boots || items.hookshot);
        }
    }
};

dungeons[9] = {
    name: "Turtle Rock <img src='images/medallion0.png' class='mini'><img src='images/lantern.png' class='mini'>",
    abbrev: "TR",
    x: "96.9%",
    y: "7.0%",
    image: "boss92.png",
    isBeaten: false,
    isBeatable: function(){
		if (!this.isAccessible()) {
            if (glitches.darkrooms.oldMan && doableWith(this.isAccessible, "lantern") && items.firerod && items.icerod && items.somaria && (items.lantern || glitches.darkrooms.tr)) {
                return "glitched";
            } else {
                return "unavailable";
            }
        } else {
            if (logic !== "major") {
                if (items.firerod && items.icerod && items.somaria) {
                    if (items.lantern) {
                        return "available";
                    } else if (glitches.darkrooms.tr) {
                        return "glitched";
                    } else {
                        return "unavailable";
                    }
                } else {
                    return "unavailable";
                }
            } else {
                if (items.firerod && items.icerod && items.somaria) {
                    return "available";
                } else {
                    return "unavailable";
                }
            }
        }
    },
    canGetChest: function(){
        if (!this.isAccessible()) {
            if (glitches.darkrooms.oldMan && doableWith(this.isAccessible, "lantern")) {
                return "glitched";
            } else {
                return "unavailable";
            }
        } else {
            if (logic !== "major") {
                if (items.firerod && items.icerod && items.somaria) {
                    if (items.lantern) {
                        return "available";
                    } else if (glitches.darkrooms.tr) {
                        return "glitched";
                    } else {
                        return "possible";
                    }
                } else {
                    return "possible";
                }
            } else {
                if (items.firerod && items.icerod && items.somaria) {
                    return "available";
                } else {
                    return "possible";
                }
            }
        }
    },
    isAccessible: function() {
        var hasMedallion = medallionCheck(1) && (items.sword || mode === "swordless");
        switch (logic) {
            case "nmg":
                return hasMedallion && items.moonpearl && items.somaria && items.glove === 2 && items.hammer && regions.eastDeathMountain();
            case "owg":
                return (hasMedallion && items.moonpearl && items.somaria && items.hammer && (items.glove === 2 || items.boots) && regions.eastDeathMountain()) ||
                        ((items.mirror || (items.moonpearl && canSpinSpeed())) && regions.darkEastDeathMountain());
            case "major":
                return items.mirror || items.moonpearl || items.bottle;

        }
    }
};

//define overworld chests
var chests = new Array;

chests[0] = {
    name: "King's Tomb <img src='images/boots.png' class='mini'> + <img src='images/glove2.png' class='mini'>/<img src='images/mirror.png' class='mini'>",
    x: "30.8%",
    y: "29.6%",
    isOpened: false,
    isAvailable: function(){
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
    name: "Dam (2)",
    x: "23.4%",
    y: "93.4%",
    isOpened: false,
    isAvailable: function(){
	    return "available";
    }
};

chests[2] = {
    name: "Link's House",
    x: "27.4%",
    y: "67.9%",
    isOpened: true,
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
        if (regions.eastDeathMountain()) {
            return "available";
        } else if (glitches.darkrooms.oldMan && doableWith(regions.eastDeathMountain, "lantern")) {
            return "glitched";
        } else {
            return "unavailable";
        }
    }
};

chests[4] = {
    name: "Mimic Cave (<img src='images/mirror.png' class='mini'> outside of Turtle Rock)(Yellow = possible w/out <img src='images/firerod.png' class='mini'>)",
    x: "42.6%",
    y: "9.3%",
    isOpened: false,
    isAvailable: function() {
        switch (logic) {
            case "nmg":
                if (dungeons[9].isAccessible() && items.mirror) {
                    if (items.firerod) {
                        return "available";
                    } else {
                        return "possible";
                    }
                } else if (glitches.darkrooms.oldMan && doableWith(dungeons[9].isAccessible, "lantern") && items.mirror) {
                    return "glitched";
                } else {
                    return "unavailable";
                }
            case "owg":
                if (items.hammer && items.mirror && regions.darkEastDeathMountain()) {
                    return "available";
                } else if (items.hammer && items.mirror && glitches.darkrooms.oldMan && doableWith(regions.darkEastDeathMountain, "lantern")) {
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
	    return "available";
    }
};

chests[6] = {
    name: "Chicken House <img src='images/bomb.png' class='mini'>",
    x: "4.4%",
    y: "54.2%",
    isOpened: false,
    isAvailable: function(){
	    return "available";
    }
};

chests[7] = {
    name: "Bombable Hut <img src='images/bomb.png' class='mini'>",
    x: "55.4%",
    y: "57.8%",
    isOpened: false,
    isAvailable: function(){
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
    name: "Aginah's Cave <img src='images/bomb.png' class='mini'>",
    x: "10.0%",
    y: "82.6%",
    isOpened: false,
    isAvailable: function(){
		return "available";
    }
};

chests[10] = {
    name: "West of Mire (2)",
    x: "51.7%",
    y: "79.5%",
    isOpened: false,
    isAvailable: function(){
		if (regions.mire()) {
            switch (logic) {
                case "nmg":
                    if (items.moonpearl) {
                        return "available";
                    } else if (glitches.superbunny && items.mirror) {
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
            return "glitched";
        } else {
            return "unavailable";
        }
    }
};

chests[11] = {
    name: "Super Bunny Cave (2) : Don't need <img src='images/moonpearl.png' class='mini'>",
    x: "92.8%",
    y: "14.7%",
    isOpened: false,
    isAvailable: function(){
        switch(logic) {
            case "nmg":
                if (regions.darkEastDeathMountain()) {
                    return "available";
                } else if (glitches.superbunny && doableWith(regions.darkEastDeathMountain, "moonpearl")) {
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
    name: "Sahasrahla's Hut (3) <img src='images/bomb.png' class='mini'>/<img src='images/boots.png' class='mini'>",
    x: "40.7%",
    y: "41.4%",
    isOpened: false,
    isAvailable: function(){
	    return "available";
    }
};

chests[13] = {
    name: "Spike Cave",
    x: "78.6%",
    y: "14.9%",
    isOpened: false,
    isAvailable: function(){
        var isAccessible = items.hammer && items.glove;
        if (regions.darkWestDeathMountain()) {
            return isAccessible ? "available" : "unavailable";            
        } else if (glitches.darkrooms.oldMan && doableWith(regions.darkWestDeathMountain, "lantern")) {
            return isAccessible ? "glitched" : "unavailable";
        } else {
            return "unavailable";
        }
    }
};

chests[14] = {
    name: "Kakariko Well (4 + <img src='images/bomb.png' class='mini'>)",
    x: "1.7%",
    y: "41.0%",
    isOpened: false,
    isAvailable: function(){
	    return "available";
    }
};

chests[15] = {
    name: "Thieve's Hut (4 + <img src='images/bomb.png' class='mini'>)",
    x: "6.4%",
    y: "41.0%",
    isOpened: false,
    isAvailable: function(){
	    return "available";
    }
};

chests[16] = {
    name: "Hype Cave! <img src='images/bomb.png' class='mini'> (NPC + 4 <img src='images/bomb.png' class='mini'>)",
    x: "80.0%",
    y: "77.1%",
    isOpened: false,
    isAvailable: function(){
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
    name: "Death Mountain East (5 + 2 <img src='images/bomb.png' class='mini'>)",
    x: "41.4%",
    y: "17.1%",
    isOpened: false,
    isAvailable: function(){
        if (regions.eastDeathMountain()) {
            return "available";
        } else if (glitches.darkrooms.oldMan && doableWith(regions.eastDeathMountain, "lantern")) {
            return "glitched";
        } else {
            return "unavailable";
        }
    }
};

chests[18] = {
    name: "Bonk Rocks <img src='images/boots.png' class='mini'>",
    x: "19.5%",
    y: "29.3%",
    isOpened: false,
    isAvailable: function(){
        if (items.boots)
            return "available";
        return "unavailable";

    }
};

chests[19] = {
    name: "Minimoldorm Cave (NPC + 4) <img src='images/bomb.png' class='mini'>",
    x: "32.6%",
    y: "93.4%",
    isOpened: false,
    isAvailable: function(){
	    return "available";
    }
};

chests[20] = {
    name: "Ice Rod Cave <img src='images/bomb.png' class='mini'>",
    x: "44.7%",
    y: "76.9%",
    isOpened: false,
    isAvailable: function(){
	    return "available";
    }
};

chests[21] = {
    name: "Hookshot Cave (bottom chest) <img src='images/hookshot.png' class='mini'>/<img src='images/boots.png' class='mini'>",
    x: "91.6%",
    y: "8.6%",
    isOpened: false,
    isAvailable: function(){
        switch(logic) {
            case "nmg":
                if (regions.darkEastDeathMountain() && (items.hookshot || items.boots)) {                    
                    return "available";                    
                } else if (glitches.darkrooms.oldMan && doableWith(regions.darkEastDeathMountain, "lantern") && (items.hookshot || items.boots)) {
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
    name: "Hookshot Cave (3 top chests) <img src='images/hookshot.png' class='mini'>",
    x: "91.6%",
    y: "3.4%",
    isOpened: false,
    isAvailable: function(){
        switch(logic) {
            case "nmg":
                if (regions.darkEastDeathMountain() && items.hookshot ) {                    
                    return "available";                    
                } else if ((regions.darkEastDeathMountain() || (glitches.darkrooms.oldMan && doableWith(regions.darkEastDeathMountain, "lantern"))) 
                            && (items.hookshot || glitches.hover)) {
                    return "glitched";                    
                } else {
                    return "unavailable";
                }
            case "owg":
                if (regions.darkEastDeathMountain() && items.moonpearl && items.glove && items.hookshot) {                    
                    return "available";                    
                } else if ((regions.darkEastDeathMountain() || (glitches.darkrooms.oldMan && doableWith(regions.darkEastDeathMountain, "lantern"))) 
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
                } else if (isAccessible && glitches.hover && items.boots) {
                    return "glitched";
                } else {
                    return "unavailable";
                }
        }
    }
};

chests[23] = {
    name: "Chest Game: Pay 30 rupees",
    x: "52.1%",
    y: "46.4%",
    isOpened: false,
    isAvailable: function(){
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
    name: "Bottle Vendor: Pay 100 rupees",
    x: "4.5%",
    y: "46.8%",
    isOpened: false,
    isAvailable: function(){
	    return "available";
    }
};

chests[25] = {
    name: "Sahasrahla <img src='images/pendant0.png' class='mini'>",
    x: "40.7%",
    y: "46.7%",
    isOpened: false,
    isAvailable: function(){
		for(var k=0; k<10; k++)
			if(prizes[k]==3 && items["boss"+k]==2)
				return "available";
		return "unavailable";
    }
};

chests[26] = {
    name: "Ol' Stumpy",
    x: "65.5%",
    y: "68.6%",
    isOpened: false,
    isAvailable: function(){
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
    name: "Sick Kid: Distract him with <img src='images/bottle.png' class='mini'> so that you can rob his family!",
    x: "7.8%",
    y: "52.1%",
    isOpened: false,
    isAvailable: function(){
        if (items.bottle) {
            return "available";
        } else {
            return "unavailable";
        }        
    }
};

chests[28] = {
    name: "Reunite the Hammer Brothers and show the Purple Chest to Gary",
    x: "65.2%",
    y: "52.2%",
    isOpened: false,
    isAvailable: function(){
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
    name: "Hobo <img src='images/flippers.png' class='mini'>",
    x: "35.4%",
    y: "69.7%",
    isOpened: false,
    isAvailable: function(){
        if (logic === "nmg") {
            if (items.flippers) {
                return "available";
            } else if (glitches.fakeflippers) {
                return "glitched";
            } else {
                return "unavailable";
            }
        } else {
            return "available";
        }
    }
};

chests[30] = {
    name: "Ether Tablet <img src='images/sword2.png' class='mini'><img src='images/book.png' class='mini'>",
    x: "21.0%",
    y: "3.0%",
    isOpened: false,
    isAvailable: function(){
        if (logic !== "major") {
            if (items.book && (items.mirror || (items.hammer && items.hookshot))) {
                if (regions.westDeathMountain()) {
                    if (items.sword >= 2) {
                        return "available";
                    } else {
                        return "possible";
                    }
                } else if (glitches.darkrooms.oldMan && doableWith(regions.westDeathMountain, "lantern")) {
                    return "glitched";
                }
            }           
        } else {
            if (regions.westDeathMountain() && items.book) {
                if (items.sword >= 2) {
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
    name: "Bombos Tablet <img src='images/mirror.png' class='mini'><img src='images/sword2.png' class='mini'><img src='images/book.png' class='mini'>",
    x: "11.0%",
    y: "92.2%",
    isOpened: false,
    isAvailable: function(){
        switch (logic) {
            case "nmg":
                if (items.book && items.mirror && regions.SouthDarkWorld()) {
                    if (items.sword >= 2) {
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
                    if (items.sword >= 2) {
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
                    if (items.sword >= 2) {
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
                } else if (glitches.darkrooms.oldMan && doableWith(regions.northEastDarkWorld, "lantern") && items.moonpearl && items.glove) {
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
    name: "King Zora: Pay 500 rupees",
    x: "47.5%",
    y: "12.1%",
    isOpened: false,
    isAvailable: function(){
        if (logic === "nmg") {
            if (items.flippers || items.glove) {
                return "available";
            } else if (glitches.fakeflippers) {
                return "glitched";
            } else {
                return "unavailable";
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
        } else if (glitches.darkrooms.oldMan && doableWith(regions.westDeathMountain, "lantern")) {
            return "glitched";
        } else {
            return "unavailable";
        }
    }
};

chests[35] = {
    name: "Witch: Give her <img src='images/allpowder1.png' class='mini'>",
    x: "40.8%",
    y: "32.5%",
    isOpened: false,
    isAvailable: function(){
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
		return "available";
    }
};

chests[37] = {
    name: "Lumberjack Tree <img src='images/agahnim.png' class='mini'><img src='images/boots.png' class='mini'>",
    x: "15.1%",
    y: "7.6%",
    isOpened: false,
    isAvailable: function(){
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
        } else if (glitches.darkrooms.oldMan && doableWith(regions.westDeathMountain, "lantern")) {
            return "glitched";
        } else {
            return "unavailable";
        }
    }
};

chests[39] = {
    name: "South of Grove <img src='images/mirror.png' class='mini'>",
    x: "14.1%",
    y: "84.1%",
    isOpened: false,
    isAvailable: function(){
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
    name: "Graveyard Cliff Cave <img src='images/mirror.png' class='mini'>",
    x: "28.1%",
    y: "27.0%",
    isOpened: false,
    isAvailable: function(){
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
    name: "Checkerboard Cave <img src='images/mirror.png' class='mini'>",
    x: "8.8%",
    y: "77.3%",
    isOpened: false,
    isAvailable: function(){
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
                } else if (items.glove && items.mirror && glitches.darkrooms.oldMan && doableWith(regions.mire, "lantern")) {
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
    name: "Hammer Pegs <img src='images/hammer.png' class='mini'><img src='images/hammer.png' class='mini'><img src='images/hammer.png' class='mini'><img src='images/hammer.png' class='mini'><img src='images/hammer.png' class='mini'><img src='images/hammer.png' class='mini'><img src='images/hammer.png' class='mini'><img src='images/hammer.png' class='mini'>!!!!!!!!",
    x: "65.8%",
    y: "60.1%",
    isOpened: false,
    isAvailable: function(){
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
    name: "Library <img src='images/boots.png' class='mini'>",
    x: "7.7%",
    y: "65.9%",
    isOpened: false,
    isAvailable: function(){
        if (items.boots) {
            return "available";
        } else {
            return "possible";
        }
    }
};

chests[44] = {
    name: "Mushroom",
    x: "6.2%",
    y: "8.6%",
    isOpened: false,
    isAvailable: function(){
		return "available";
    }
};

chests[45] = {
    name: "Spectacle Rock <img src='images/mirror.png' class='mini'>",
    x: "25.4%",
    y: "8.5%",
    isOpened: false,
    isAvailable: function(){
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
        } else if (glitches.darkrooms.oldMan && doableWith(regions.westDeathMountain, "lantern")) {
            return "glitched";
        } else {
            return "unavailable";
        }
    }
};

chests[46] = {
    name: "Floating Island <img src='images/mirror.png' class='mini'>",
    x: "40.2%",
    y: "3.0%",
    isOpened: false,
    isAvailable: function(){
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
        } else if (glitches.darkrooms.oldMan && doableWith(regions.eastDeathMountain, "lantern")) {
            return "glitched";
        } else {
            return "unavailable";
        }
	}
};

chests[47] = {
    name: "Race Minigame <img src='images/bomb.png' class='mini'>/<img src='images/boots.png' class='mini'>",
    x: "1.8%",
    y: "69.8%",
    isOpened: false,
    isAvailable: function(){
		return "available";
    }
};

chests[48] = {
    name: "Desert West Ledge <img src='images/book.png' class='mini'>/<img src='images/mirror.png' class='mini'>",
    x: "1.5%",
    y: "91.0%",
    isOpened: false,
    isAvailable: function(){
        if (dungeons[1].isAccessible()) {
            return "available";
        } else if (glitches.darkrooms.oldMan && doableWith(dungeons[1].isAccessible, "lantern")) {
            return "glitched";        
        } else if (considerAga() && doableWith(dungeons[1].isAccessible, "agahnim")) {
            return "aga";
        } else {
            return "possible";
        }
    }
};

chests[49] = {
    name: "Lake Hylia Island <img src='images/mirror.png' class='mini'>",
    x: "36.1%",
    y: "82.9%",
    isOpened: false,
    isAvailable: function(){
        switch (logic) {
            case "nmg":
                if (items.flippers && items.moonpearl && items.mirror && (regions.SouthDarkWorld() || regions.northEastDarkWorld())) {
                    return "available";
                } else if (considerAga() && items.flippers && items.moonpearl && items.mirror && (doableWith(regions.SouthDarkWorld, "agahnim") || doableWith(regions.northEastDarkWorld, "agahnim"))) {
                    return "aga";
                } else if (items.flippers || glitches.fakeflippers) {
                    return "possible";
                } else {
                    return "unavailable";
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
    name: "Bumper Cave <img src='images/cape.png' class='mini'>",
    x: "67.1%",
    y: "15.2%",
    isOpened: false,
    isAvailable: function(){
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
        } else if (considerAga() && doableWith(regions.northWestDarkWorld, "agahnim") && isAccessible) {
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
        if (regions.northEastDarkWorld()) {
            return "available";
        } else if (glitches.darkrooms.oldMan && doableWith(regions.northEastDarkWorld, "lantern")) {
            return "glitched";
        } else if (considerAga() && doableWith(regions.northEastDarkWorld, "agahnim")) {
            return "aga";
        } else {
            return "unavailable";
        }
    }
};

chests[52] = {
    name: "Digging Game: Pay 80 rupees",
    x: "52.9%",
    y: "69.2%",
    isOpened: false,
    isAvailable: function(){
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
    name: "Zora River Ledge <img src='images/flippers.png' class='mini'>",
    x: "47.5%",
    y: "17.3%",
    isOpened: false,
    isAvailable: function(){
        if (logic === "nmg") {
            if (items.flippers) {
                return "available";
            } else if (items.glove || glitches.fakeflippers) {
                return "possible";
            } else {
                return "unavailable";
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
    name: "Shovel Item <img src='images/allflute1.png' class='mini'>",
    x: "14.4%",
    y: "66.2%",
    isOpened: false,
    isAvailable: function(){
		if (items.allflute % 2 === 1) {
            return "available";
        } else {
            return "unavailable";
        }		
	}
};

chests[55] = {
    name: "Fall to Escape Sewer (3) <img src='images/glove.png' class='mini'> + <img src='images/bomb.png' class='mini'>/<img src='images/boots.png' class='mini'>",
    x: "26.8%",
    y: "32.4%",
    isOpened: false,
    isAvailable: function(){
        if (mode === "standard") {
            return "available";
        } else {
            if (items.lantern || items.glove) {
                return "available";
            } else {
                return "unavailable";
            }
        }	    
    }
};

chests[56] = {
    name: "Castle Secret Entrance",
    x: "29.8%",
    y: "41.8%",
    isOpened: true,
    isAvailable: function(){
		return "available";
    }
};

chests[57] = {
    name: "Hyrule Castle (4 including Key)",
    x: "24.9%",
    y: "44.1%",
    isOpened: true,
    isAvailable: function(){
        if (mode === "standard") {
            return "available";
        } else {
            if (items.lantern) {
                return "available";
            } else {
                return "possible";
            }
        }
    }
};

chests[58] = {
    name: "Sanctuary",
    x: "23.0%",
    y: "28.0%",
    isOpened: true,
    isAvailable: function(){
		return "available";
    }
};

chests[59] = {
    name: "Magic Bat Cave <img src='images/hammer.png' class='mini'>/<img src='images/mirror.png' class='mini'> + <img src='images/allpowder2.png' class='mini'>",
    x: "16.0%",
    y: "58.0%",
    isOpened: false,
    isAvailable: function(){
        var isAccessible;
        switch (logic) {
            case "nmg":
                isAccessible = items.allpowder >= 2 && (items.hammer || (items.moonpearl && items.mirror && items.glove === 2));
                break;
            case "owg":
                isAccessible = items.allpowder >= 2 && (items.hammer || items.boots || (items.moonpearl && items.mirror && items.glove === 2 && regions.northWestDarkWorld()));
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
    name: "Fat Fairy: Buy OJ bomb from Dark Link's House after <img src='images/crystal0.png' class='mini'>5 <img src='images/crystal0.png' class='mini'>6 (2 items)",
    x: "73.5%",
    y: "48.5%",
    isOpened: false,
    isAvailable: function(){ // TODO remake this, but kinda works I guess
		//crystal check
		var crystalCount = 0;
		for(var k=0; k<10; k++)
			if(prizes[k]==2 && items["boss"+k]==2)
				crystalCount++;
        
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
    name: "Master Sword Pedestal <img src='images/pendant0.png' class='mini'><img src='images/pendant1.png' class='mini'><img src='images/pendant2.png' class='mini'> (can check with <img src='images/book.png' class='mini'>)",
    x: "2.5%",
    y: "3.2%",
    isOpened: false,
    isAvailable: function(){
		var pendantCount = 0;
		for(var k=0; k<10; k++)
			if((prizes[k]==3 || prizes[k]==4) && items["boss"+k]==2)
				if(++pendantCount==3)
					return "available";
        if (items.book)
            return "possible";
		return "unavailable";
    }
};

