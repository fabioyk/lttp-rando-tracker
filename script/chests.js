function steve(){
    if(!items.moonpearl)
	    return false;
    if(items.glove==2 || (items.glove && items.hammer))
	    return true;
    return items.agahnim && items.hookshot && (items.hammer || items.glove || items.flippers);
}

function considerAga() {
    return !items.agahnim && !steve() && (items.lantern || glitches.aga_dark) && items.moonpearl && (items.cape || items.sword >= 2);
}

function canAccessDM() {
    return items.allflute >= 2 || ((items.glove && items.lantern) || (items.glove && !items.lantern && glitches.darkroom));
}

function canTravelFromAgaToNorth() {
    return items.hookshot && (items.hammer || items.gloves);
}

function canTravelFromAgaToSouth() {
    return items.hammer || canTravelFromAgaToNorth();
}

function hasFiresource() {
    return items.firerod || items.lantern;
}

function medallionCheck(index) {
    return ((items.bombos && items.ether && items.quake) || (medallions[index]==1 && items.bombos) || (medallions[index]==2 && items.ether) || (medallions[index]==3 && items.quake));
}

// define dungeon chests
var dungeons = new Array;

dungeons[0] = {
    name: "Eastern Palace",
    x: "46.8%",
    y: "38.8%",
    image: "boss02.png",
    isBeaten: false,
    isBeatable: function(){
		if(items.bow>1 && items.lantern)
			return "available";
        if (items.bow>1 && glitches.darkroom)
            return "glitched";
        if (items.bow>1)
            return "possible";
		return "unavailable";
    },
    canGetChest: function(){
		if(items.bow>1 && items.lantern)
			return "available";
        if (items.bow>1 && glitches.darkroom)
            return "glitched";
		return "possible";
    }
};

dungeons[1] = {
    name: "Desert Palace",
    x: "3.8%",
    y: "78.4%",
    image: "boss12.png",
    isBeaten: false,
    isBeatable: function(){		
		if(!this.isAccessible())
			return "unavailable";
        if(!items.glove && !(items.allflute >= 2 && items.glove == 2 && items.mirror))
			return "unavailable";
		if(!hasFiresource())
			return "unavailable";
		if(!items.boots)
			return "possible";
		return "available";
    },
    canGetChest: function(){
		if(!this.isAccessible())
			return "unavailable";
		if(items.boots && hasFiresource() && items.glove)
			return "available";
		return "possible";
    },
    isAccessible: function() {
        return items.book || (items.allflute >= 2 && items.glove == 2 && items.mirror);
    }
};

dungeons[2] = {
    name: "Tower of Hera",
    x: "31.0%",
    y: "5.5%",
    image: "boss22.png",
    isBeaten: false,
    isBeatable: function(){
        if (!this.isAccessible())
            return "unavailable";
        if (items.sword === 0 && !items.hammer)
            return "unavailable";
        if (items.allflute < 2 && !items.lantern && hasFiresource())
            return "glitched";
		if(hasFiresource())
			return "available";
		return "possible";
    },
    canGetChest: function(){
		if (!this.isAccessible())
            return "unavailable";
        if (items.allflute < 2 && !items.lantern && hasFiresource())
            return "glitched";
		if(hasFiresource())
			return "available";
		return "possible";
    },
    isAccessible: function() {
        if(items.allflute < 2 && (!items.glove || (items.glove && !items.lantern && !glitches.darkroom)))
			return false;
		if(!items.mirror && !(items.hookshot && items.hammer))
			return false;
        return true;
    }
};

dungeons[3] = {
    name: "Palace of Darkness <img src='images/lantern.png' class='mini'>",
    x: "97.0%",
    y: "40.0%",
    image: "boss32.png",
    isBeaten: false,
    isBeatable: function(){
        if (considerAga() && items.bow>1 && items.hammer && (items.lantern || glitches.darkroom))
            return "aga";
		if(!this.isAccessible() || !(items.bow>1 && items.hammer))
			return "unavailable";
        if (!items.lantern && !glitches.darkroom)
            return "unavailable";
        if (!items.lantern && glitches.darkroom)
            return "glitched";
		return "available";
    },
    canGetChest: function(){
        if (considerAga())
            return "aga";
		if(!this.isAccessible())
			return "unavailable";
		if(items.bow>1 && items.hammer && items.lantern)
			return "available";
        if (!items.lantern && glitches.darkroom && items.bow>1 && items.hammer)
            return "glitched";
		return "possible";
    },
    isAccessible: function() {
        return steve() || (items.agahnim && items.moonpearl);
    }
};

dungeons[4] = {
    name: "Swamp Palace <img src='images/mirror.png' class='mini'>",
    x: "73.5%",
    y: "91.0%",
    image: "boss42.png",
    isBeaten: false,
    isBeatable: function(){
        if (considerAga() && items.mirror && items.flippers && items.hammer && items.hookshot)
            return "aga";
		if(!this.isAccessible() || !(items.mirror && items.flippers && items.hammer && items.hookshot))
            return "unavailable";   
		return "available";
	},
    canGetChest: function(){
        if (considerAga() && canTravelFromAgaToSouth() && items.mirror && items.flippers)
            return "aga";
		if(!this.isAccessible())
            return "unavailable";
        if (items.hookshot && items.hammer)
            return "available";        
        return "possible";
    },
    isAccessible: function() {
        return (items.moonpearl && items.mirror && items.flippers && (steve() || items.agahnim && items.hammer));
    }
};

dungeons[5] = {
    name: "Skull Woods",
    x: "53.3%",
    y: "5.4%",
    image: "boss52.png",
    isBeaten: false,
    isBeatable: function(){
        if (considerAga() && canTravelFromAgaToNorth() && items.firerod && items.sword)
            return "aga";
		if(!steve() || !items.firerod || !items.sword)
			return "unavailable";        
		return "available";
    },
    canGetChest: function(){
        if (considerAga() && canTravelFromAgaToNorth())
            return "aga";
		if(!steve())
			return "unavailable";        
		if(items.firerod && items.sword)
			return "available";
		return "possible";
    }
};

dungeons[6] = {
    name: "Thieves' Town",
    x: "56.4%",
    y: "47.9%",
    image: "boss62.png",
    isBeaten: false,
    isBeatable: function(){
		if(steve() && this.canKillBoss())
			return "available";
        if (considerAga() && canTravelFromAgaToNorth() && this.canKillBoss())
            return "aga";
		return "unavailable";
    },
    canGetChest: function(){
        if (considerAga() && canTravelFromAgaToNorth())
            return "aga";
		if(!steve())
			return "unavailable";            
		if(!items.hammer || !this.canKillBoss())
			return "possible";
		return "available";
    },
    canKillBoss: function() {
        return items.sword || items.hammer || items.somaria || items.byrna;
    }
};

dungeons[7] = {
    name: "Ice Palace",
    x: "89.8%",
    y: "85.8%",
    image: "boss72.png",
    isBeaten: false,
    isBeatable: function(){
		if(!this.isAccessible())
            return "unavailable";
        if (!this.canKillBoss())
            return "unavailable";
        if(items.hookshot || items.somaria && (items.moonpearl && items.flippers))
			return "available";
        if((glitches.ipbj && !(items.hookshot || items.somaria)) || !items.moonpearl || !items.flippers)
            return "glitched";
		return "unavailable";
    },
    canGetChest: function(){
		if(!this.isAccessible())
            return "unavailable";
        if(((glitches.ipbj && !(items.hookshot || items.somaria)) || !items.moonpearl || !items.flippers) && this.canKillBoss())
            return "glitched";
        if((items.hookshot || items.somaria) && this.canKillBoss())
			return "available";        
		return "possible";
    },
    isAccessible: function() {
        if((!items.moonpearl && !glitches.bunnyrevival) || (!items.flippers && !glitches.fakeflippers) || items.glove!=2)
			return false;
		if(!items.firerod && !items.bombos)
			return false;
        return true;
    },
    canKillBoss: function() {
        return items.hammer && (items.firerod || items.sword);
    }
};

dungeons[8] = {
    name: "Misery Mire <img src='images/medallion0.png' class='mini'><img src='images/lantern.png' class='mini'>",
    x: "55.8%",
    y: "82.9%",
    image: "boss82.png",
    isBeaten: false,
    isBeatable: function(){
		if(!this.isAccessible())
			return "unavailable";
        if(!items.somaria)
            return "unavailable";
		if(hasFiresource())
			return "available";
		return "possible";
    },
    canGetChest: function(){
		if(!this.isAccessible())
			return "unavailable";        
		if(hasFiresource() && items.somaria)
			return "available";
		return "possible";
    },
    isAccessible: function() {
        if(!items.moonpearl || items.allflute < 2 || items.glove!=2)
			return false;		
		if(!medallionCheck(0))
            return false;
        if(!items.boots && !items.hookshot)
			return false;
        return true;
    }
};

dungeons[9] = {
    name: "Turtle Rock <img src='images/medallion0.png' class='mini'><img src='images/lantern.png' class='mini'>",
    x: "96.9%",
    y: "7.0%",
    image: "boss92.png",
    isBeaten: false,
    isBeatable: function(){
		if(!this.isAccessible() || !items.firerod || !items.icerod)
            return "unavailable";
		return "available";
    },
    canGetChest: function(){
		if(!this.isAccessible())
            return "unavailable";
		if(!items.firerod || !items.icerod)
			return "possible";
		return "available";
    },
    isAccessible: function() {
        if(!items.moonpearl || !items.hammer || items.glove!=2 || !items.somaria || 
            (!items.hookshot && !items.mirror) || 
            !medallionCheck(1) || !canAccessDM())
			return false;
        return true;
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
		if(!items.boots)
			return "unavailable";
		if ( (steve() && items.mirror) || items.glove==2 )
			return "available";
        if (considerAga() && canTravelFromAgaToNorth() && items.mirror)
            return "aga";
		return "unavailable";
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
        if ( canAccessDM() && (items.hookshot || (items.mirror&&items.hammer)))
            if (items.allflute < 2 && !items.lantern)
                return "glitched";
            else
                return "available";
        return "unavailable";
    }
};

chests[4] = {
    name: "Mimic Cave (<img src='images/mirror.png' class='mini'> outside of Turtle Rock)(Yellow = possible w/out <img src='images/firerod.png' class='mini'>)",
    x: "42.6%",
    y: "9.3%",
    isOpened: false,
    isAvailable: function(){
		if(!items.moonpearl || !items.hammer || items.glove!=2 || !items.somaria || !items.mirror)
			return "unavailable";
		if(!medallionCheck(1))
			return "unavailable";
		if(items.firerod)
			return "available";
		return "possible";
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
		if(steve())
			return "available";
        if (considerAga() && canTravelFromAgaToNorth())
            return "aga";
		return "unavailable";
    }
};

chests[8] = {
    name: "C House",
    x: "60.8%",
    y: "47.9%",
    isOpened: false,
    isAvailable: function(){
		if(steve())
			return "available";
        if (considerAga() && canTravelFromAgaToNorth())
            return "aga";
		return "unavailable";
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
		if( items.allflute >= 2 && items.moonpearl && items.glove==2 )
			return "available";
		return "unavailable";
    }
};

chests[11] = {
    name: "DW Death Mountain (2) : Don't need <img src='images/moonpearl.png' class='mini'>",
    x: "92.8%",
    y: "14.7%",
    isOpened: false,
    isAvailable: function(){
		if( items.glove==2 && (items.hookshot || (items.mirror && items.hammer)) )
            if (items.allflute < 2 && !items.lantern)
                return "glitched";
            else
			    return "available";
		return "unavailable";
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
        if( items.moonpearl && items.glove && items.hammer )
            if (items.allflute < 2 && !items.lantern)
                return "glitched";
            else
			    return "available";
        return "unavailable";
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
        if( steve() || (items.agahnim && items.moonpearl && items.hammer) )
            return "available";
        if (considerAga() && canTravelFromAgaToSouth())
            return "aga";
        return "unavailable";
    }
};

chests[17] = {
    name: "Death Mountain East (5 + 2 <img src='images/bomb.png' class='mini'>)",
    x: "41.4%",
    y: "17.1%",
    isOpened: false,
    isAvailable: function(){
        if( canAccessDM() && (items.hookshot || (items.mirror && items.hammer)) )
            if (items.allflute < 2 && !items.lantern)
                return "glitched";
            else
                return "available";
        return "unavailable";		
    }
};

chests[18] = {
    name: "Bonk Cave <img src='images/boots.png' class='mini'>",
    x: "19.5%",
    y: "29.3%",
    isOpened: false,
    isAvailable: function(){
        if(items.boots)
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
        if(items.moonpearl && items.glove==2 && (items.hookshot || (items.mirror&&items.hammer&&items.boots)))
            if (items.allflute < 2 && !items.lantern)
                return "glitched";
            else
			    return "available";
        return "unavailable";
    }
};

chests[22] = {
    name: "Hookshot Cave (3 top chests) <img src='images/hookshot.png' class='mini'>",
    x: "91.6%",
    y: "3.4%",
    isOpened: false,
    isAvailable: function(){
	    if( items.moonpearl && items.glove==2 && items.hookshot)
            if (items.allflute < 2 && !items.lantern)
                return "glitched";
            else
			    return "available";
		return "unavailable";
    }
};

chests[23] = {
    name: "Chest Game: Pay 30 rupees",
    x: "52.1%",
    y: "46.4%",
    isOpened: false,
    isAvailable: function(){
        if(steve())
            return "available";
        if (considerAga() && canTravelFromAgaToNorth())
            return "aga";
        return "unavailable";

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
        if( steve() || (items.agahnim && items.moonpearl && items.hammer) )
            return "available";
        if (considerAga() && canTravelFromAgaToSouth())
            return "aga";
        return "unavailable";
    }
};

chests[27] = {
    name: "Sick Kid: Distract him with <img src='images/bottle.png' class='mini'> so that you can rob his family!",
    x: "7.8%",
    y: "52.1%",
    isOpened: false,
    isAvailable: function(){
        if(items.bottle)
            return "available";
        return "unavailable";
    }
};

chests[28] = {
    name: "Reunite the Hammer Brothers and show the Purple Chest to Gary",
    x: "65.2%",
    y: "52.2%",
    isOpened: false,
    isAvailable: function(){
        if(items.moonpearl && items.glove==2 && items.mirror)
            return "available";
        return "unavailable";
    }
};

chests[29] = {
    name: "Hobo <img src='images/flippers.png' class='mini'>",
    x: "35.4%",
    y: "69.7%",
    isOpened: false,
    isAvailable: function(){
        if(items.flippers)
            return "available";
        if (glitches.fakeflippers)
            return "glitched";
        return "unavailable";
    }
};

chests[30] = {
    name: "Ether Tablet <img src='images/sword2.png' class='mini'><img src='images/book.png' class='mini'>",
    x: "21.0%",
    y: "3.0%",
    isOpened: false,
    isAvailable: function(){
        if( items.sword>=2 && items.book && canAccessDM() && (items.mirror || (items.hookshot&&items.hammer)) )
            if (items.allflute < 2 && !items.lantern)
                return "glitched";
            else
                return "available";
        return "unavailable";
    }
};

chests[31] = {
    name: "Bombos Tablet <img src='images/mirror.png' class='mini'><img src='images/sword2.png' class='mini'><img src='images/book.png' class='mini'>",
    x: "11.0%",
    y: "92.2%",
    isOpened: false,
    isAvailable: function(){
        if( (steve() || (items.agahnim && items.moonpearl && items.hammer)) && items.mirror && items.sword>=2 && items.book )
            return "available";
        if (considerAga() && canTravelFromAgaToNorth() && items.mirror && items.sword >= 2 && items.book)
            return "aga";
        return "unavailable";
    }
};

chests[32] = {
    name: "Catfish",
    x: "96.0%",
    y: "17.2%",
    isOpened: false,
    isAvailable: function(){
        if( items.moonpearl && items.glove && (items.agahnim || items.hammer || (items.glove==2 && items.flippers)) )
            return "available";
        if (considerAga() && items.glove)
            return "aga";
        return "unavailable";
    }
};

chests[33] = {
    name: "King Zora: Pay 500 rupees",
    x: "47.5%",
    y: "12.1%",
    isOpened: false,
    isAvailable: function(){
        if( items.flippers || items.glove )
            return "available";
        if ( glitches.fakeflippers )
            return "glitched";
        return "unavailable";
    }
};

chests[34] = {
    name: "Lost Old Man",
    x: "20.8%",
    y: "20.4%",
    isOpened: false,
    isAvailable: function(){
        if( (((items.glove || items.allflute >= 2) && items.lantern) || ((items.glove || items.allflute >= 2) && !items.lantern && glitches.darkroom)))
            if (!items.lantern)
                return "glitched";            
            else
                return "available";
        return "unavailable";
    }
};

chests[35] = {
    name: "Witch: Give her <img src='images/mushroom.png' class='mini'>",
    x: "40.8%",
    y: "32.5%",
    isOpened: false,
    isAvailable: function(){
        if(items.allpowder % 2 == 1)
            return "available";
        return "unavailable";
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
        if( items.agahnim && items.boots )
            return "available";
        if (considerAga() && items.boots)
            return "aga";
        return "possible";
    }
};

chests[38] = {
    name: "Spectacle Rock Cave",
    x: "24.3%",
    y: "14.8%",
    isOpened: false,
    isAvailable: function(){
        if( canAccessDM() )
            if (items.allflute < 2 && !items.lantern)
                return "glitched";
            else
                return "available";
        return "unavailable";
    }
};

chests[39] = {
    name: "South of Grove <img src='images/mirror.png' class='mini'>",
    x: "14.1%",
    y: "84.1%",
    isOpened: false,
    isAvailable: function(){
        if( items.mirror && (steve() || (items.agahnim && items.moonpearl && items.hammer)) )
            return "available";
        if (considerAga() && canTravelFromAgaToNorth() && items.mirror)
            return "aga";
        return "unavailable";
    }
};

chests[40] = {
    name: "Graveyard Cliff Cave <img src='images/mirror.png' class='mini'>",
    x: "28.1%",
    y: "27.0%",
    isOpened: false,
    isAvailable: function(){
        if( steve() && items.mirror )
            return "available";
        if (considerAga() && items.mirror && items.hookshot)
            return "aga";
        return "unavailable";
    }
};

chests[41] = {
    name: "Checkerboard Cave <img src='images/mirror.png' class='mini'>",
    x: "8.8%",
    y: "77.3%",
    isOpened: false,
    isAvailable: function(){
        if( items.allflute >= 2 && items.glove==2 && items.mirror )
            return "available";
        return "unavailable";
    }
};

chests[42] = {
    name: " Hammer Pegs <img src='images/hammer.png' class='mini'><img src='images/hammer.png' class='mini'><img src='images/hammer.png' class='mini'><img src='images/hammer.png' class='mini'><img src='images/hammer.png' class='mini'><img src='images/hammer.png' class='mini'><img src='images/hammer.png' class='mini'><img src='images/hammer.png' class='mini'>!!!!!!!!",
    x: "65.8%",
    y: "60.1%",
    isOpened: false,
    isAvailable: function(){
        if( items.moonpearl && items.glove==2 && items.hammer )
            return "available";
        return "unavailable";
    }
};

chests[43] = {
    name: "Library <img src='images/boots.png' class='mini'>",
    x: "7.7%",
    y: "65.9%",
    isOpened: false,
    isAvailable: function(){
        if(items.boots)
            return "available";
        return "possible";
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
        if(canAccessDM())
            if(items.mirror) {
                if (!items.lantern && items.allflute < 2)
                    return "glitched";
                return "available";
            } else
                return "possible";
        return "unavailable";
    }
};

chests[46] = {
    name: "Floating Island <img src='images/mirror.png' class='mini'>",
    x: "40.2%",
    y: "3.0%",
    isOpened: false,
    isAvailable: function(){
		if(canAccessDM() && (items.hookshot || (items.hammer && items.mirror)) )
			if(items.mirror && items.moonpearl && items.glove==2)
                if (!items.lantern && items.allflute < 2)
				    return "glitched";
                else
                    return "available";
			else
				return "possible";
		return "unavailable";
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
        if( items.book || (items.flute && items.glove==2 && items.mirror) )
            return "available";
        return "possible";
    }
};

chests[49] = {
    name: "Lake Hylia Island <img src='images/mirror.png' class='mini'>",
    x: "36.1%",
    y: "82.9%",
    isOpened: false,
    isAvailable: function(){
		if(items.flippers || glitches.fakeflippers)
			if( items.flippers && items.moonpearl && items.mirror && (items.agahnim || items.glove==2 || (items.glove&&items.hammer)) )                
				return "available";
			else
				return "possible";    
		return "unavailable";
	}
};

chests[50] = {
    name: "Bumper Cave <img src='images/cape.png' class='mini'>",
    x: "67.1%",
    y: "15.2%",
    isOpened: false,
    isAvailable: function(){
		if(steve())
			if(items.cape && items.glove)
				return "available";
			else
				return "possible";
        if (considerAga() && items.hookshot)
            return "aga";
		return "unavailable";
    }
};

chests[51] = {
    name: "Pyramid",
    x: "79.0%",
    y: "43.5%",
    isOpened: false,
    isAvailable: function(){
        if( items.agahnim || (items.glove&&items.hammer&&items.moonpearl) || (items.glove==2&&items.moonpearl&&items.flippers) )
            return "available";
        if ((items.lantern || glitches.aga_dark) && (items.cape || items.sword >= 2))
            return "aga";
        return "unavailable";
    }
};

chests[52] = {
    name: "Digging Game: Pay 80 rupees",
    x: "52.9%",
    y: "69.2%",
    isOpened: false,
    isAvailable: function(){
		if( steve() || (items.agahnim && items.moonpearl && items.hammer) )
			return "available";
        if (considerAga() && canTravelFromAgaToSouth())
            return "aga";
		return "unavailable";
    }
};

chests[53] = {
    name: "Zora River Ledge <img src='images/flippers.png' class='mini'>",
    x: "47.5%",
    y: "17.3%",
    isOpened: false,
    isAvailable: function(){
		if(items.flippers)
			return "available";
		if(items.glove || glitches.fakeflippers)
			return "possible";
		return "unavailable";
    }
};

chests[54] = {
    name: "Buried Item <img src='images/shovel.png' class='mini'>",
    x: "14.4%",
    y: "66.2%",
    isOpened: false,
    isAvailable: function(){
		if(items.allflute % 2 == 1)
			return "available";
		return "unavailable";
	}
};

chests[55] = {
    name: "Fall to Escape Sewer (3) <img src='images/glove.png' class='mini'> + <img src='images/bomb.png' class='mini'>/<img src='images/boots.png' class='mini'>",
    x: "26.8%",
    y: "32.4%",
    isOpened: false,
    isAvailable: function(){
		if(items.glove)
			return "available";
		return "unavailable";
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
		return "available";
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
    name: "Bat Cave <img src='images/hammer.png' class='mini'>/<img src='images/mirror.png' class='mini'> + <img src='images/powder.png' class='mini'>",
    x: "16.0%",
    y: "58.0%",
    isOpened: false,
    isAvailable: function(){
		if(items.allpowder >= 2 && (items.hammer || (steve() && items.gloves == 2 && items.mirror)))
			return "available";
		return "unavailable";
    }
};

chests[60] = {
    name: "Take the frog home, doable without mirror now",
    x: "15.2%",
    y: "51.8%",
    isOpened: false,
    isAvailable: function(){
		if(items.moonpearl && items.glove==2)
			return "available";
		return "unavailable";
    }
};

chests[61] = {
    name: "Fat Fairy: Buy OJ bomb from Dark Link's House after <img src='images/crystal0.png' class='mini'>5 <img src='images/crystal0.png' class='mini'>6 (2 items)",
    x: "73.5%",
    y: "48.5%",
    isOpened: false,
    isAvailable: function(){
		//crystal check
		var crystalCount = 0;
		for(var k=0; k<10; k++)
			if(prizes[k]==2 && items["boss"+k]==2)
				crystalCount++;
		
		if(!items.moonpearl || crystalCount<2)
			return "unavailable";
		if(items.hammer && (items.agahnim || items.glove))
			return "available";
		if(items.agahnim && items.mirror && steve())
			return "available";
        if ((considerAga() && items.hammer) || (considerAga() && canTravelFromAgaToNorth() && items.mirror))
            return "aga";
		return "unavailable";
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

