var items = {
	tunic: 1,
	sword: 1,
	shield: 0,
	moonpearl: false,
	
	bow: 0,
    boomerang: 0,
    hookshot: false,
    bombs: true,
    allpowder: 0,    

    firerod: false,
    icerod: false,
    bombos: false,
    ether: false,
    quake: false,

	boss0: 1,
    chest0: 3,
    lantern: false,
    hammer: false,
    allflute: 0,
    net: false,
    book: false,

	boss1: 1,
    chest1: 2,
    bottle:0,
    somaria: false,
    byrna: false,
    cape: false,
    mirror: false,

	boss2: 1,
    chest2: 2,
    boots: false,
    glove: 0,
    flippers: false,
    go: false,
    agahnim: 0,

	boss3: 1,
	boss4: 1,
	boss5: 1,
	boss6: 1,
	boss7: 1,
	boss8: 1,
	boss9: 1,
	
	chest3: 5,
    chest4: 6,
    chest5: 2,
    chest6: 4,
    chest7: 3,
    chest8: 2,
    chest9: 5 
};

var itemsMin = {
    sword:0,
    shield:0,
    tunic:1,

    bottle:0,
    bow:0,
    boomerang:0,
    glove:0,
    allpowder: 0,
    allflute: 0,

	boss0: 1,
	boss1: 1,
	boss2: 1,

    agahnim:0,

	boss3: 1,
	boss4: 1,
	boss5: 1,
	boss6: 1,
	boss7: 1,
	boss8: 1,
	boss9: 1
};

var itemsMax = {
    sword:4,
    shield:3,
    tunic:3,

    bottle:4,
    bow:3,
    boomerang:3,
    glove:2,
    allpowder:3,
    allflute:3,

	boss0: 2,
	boss1: 2,
	boss2: 2,

    agahnim:1,

	boss3: 2,
	boss4: 2,
	boss5: 2,
	boss6: 2,
	boss7: 2,
	boss8: 2,
	boss9: 2,
	
	chest0: 3,
    chest1: 2,
    chest2: 2,
	chest3: 5,
    chest4: 6,
    chest5: 2,
    chest6: 4,
    chest7: 3,
    chest8: 2,
    chest9: 5 

};

var itemsNames = {
    tunic: {
        1: 'Green Mail',
        2: 'Blue Mail',
        3: 'Red Mail'
    },
    sword: {
        0: 'No Sword',
        1: 'Fighter Sword',
        2: 'Master Sword',
        3: 'Tempered Sword',
        4: 'Gold Sword'
    },
    shield: {
        0: 'No Shield',
        1: 'Fighter Shield',
        2: 'Red Shield',
        3: 'Mirror Shield'
    },
    moonpearl: 'Moon Pearl',
    bow: {
        0: 'No Bow',
        1: 'Silver Arrows',
        2: 'Bow',
        3: 'Bow and Silvers'
    },
    boomerang: {
        0: 'No Boomerang',
        1: 'Blue Boomerang',
        2: 'Magic Boomerang',
        3: 'Blue and Magic Boomerangs'
    },
    hookshot: 'Hookshot',
    bombs: 'Bombs',
    allpowder: {
        0: 'No Powder',
        1: 'Mushroom',
        2: 'Magic Powder',
        3: 'Mushroom and Powder'
    },
    firerod: 'Fire Rod',
    icerod: 'Ice Rod',
    bombos: 'Bombos',
    ether: 'Ether',
    quake: 'Quake',
    lantern: 'Lantern',
    hammer: 'Hammer',
    allflute: {
        0: 'No Flute',
        1: 'Shovel',
        2: 'Flute',
        3: 'Shovel and Flute'
    },
    net: 'Bug Net',
    book: 'Book of Mudora',
    bottle: {
        0: 'No Bottles',
        1: '1 Bottle',
        2: '2 Bottles',
        3: '3 Bottles',
        4: '4 Bottles'
    },
    somaria: 'Cane of Somaria',
    byrna: 'Cane of Byrna',
    cape: 'Magic Cape',
    mirror: 'Magic Mirror',
    boots: 'Pegasus Boots',
    glove: {
        0: 'No Glove',
        1: 'Power Glove',
        2: 'Titan Mitts'
    },
    flippers: 'Flippers',
    agahnim: {
        0: 'Aga 1 Alive',
        1: 'Aga 1 Killed'
    }
}

function resetItems() {
    items = {
        tunic: 1,
        shield: 0,
        moonpearl: false,
        
        bow: 0,
        boomerang: 0,
        hookshot: false,
        bombs: true,
        allpowder: 0,    

        firerod: false,
        icerod: false,
        bombos: false,
        ether: false,
        quake: false,

        boss0: 1,
        chest0: 3,
        lantern: false,
        hammer: false,
        allflute: 0,
        net: false,
        book: false,

        boss1: 1,
        chest1: 2,
        bottle:0,
        somaria: false,
        byrna: false,
        cape: false,
        mirror: false,

        boss2: 1,
        chest2: 2,
        boots: false,
        glove: 0,
        flippers: false,
        go: false,
        agahnim: 0,

        boss3: 1,
        boss4: 1,
        boss5: 1,
        boss6: 1,
        boss7: 1,
        boss8: 1,
        boss9: 1,
        
        chest3: 5,
        chest4: 6,
        chest5: 2,
        chest6: 4,
        chest7: 3,
        chest8: 2,
        chest9: 5 
    };
    if (mode === "standard") {
        items.sword = 1;
    } else {
        items.sword = 0;
    }
    medallions[0] = 0;
    medallions[1] = 0;

    for (var i=0; i<dungeons.length; i++) {
        prizes[i] = 1;
    }
}