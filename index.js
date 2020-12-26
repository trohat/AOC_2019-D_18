console.log("funguju");

const splitLines = (data) => data.split(String.fromCharCode(10));

const keys = {};
const doorHideKeys = {};

const prepare = (data, test) => {
    const width = data[0].length;
    const height = data.length;
    console.log("Width:", width);
    console.log("Height:", height);
    const map = [];
    let i = 0;
    let meX, meY;
    for (const line of data) {
        map.push([]);
        let j = 0;
        for (const char of line) {
            const isWall = char === "#";
            if (char === "@") {
                meX = j; meY = i;
            }
            const isMe = char === "@";
            const isSpecial = (char !== "." && char !== "#");
            const isDoor = /[A-Z]/.test(char);
            const isKey = /[a-z]/.test(char);
            map[i].push({ char, isMe, isWall, isSpecial, isDoor, isKey, distance: null, visited: false, nearestCrossroad: null, behindDoors: null})
            j++;
        }
        i++;
    }
    const fieldsToSearch = [];

    if (test === "notest") {
        for (let x of [ -1, 0, 1])
            for (let y of [ -1, 0, 1]) {
                map[meY + y][meX + x].visited = true; 
                const where = Math.abs(x) + Math.abs(y);
                if (where === 0) 
                    map[meY][meX].distance = 0; 
                else if (where === 1) 
                    map[meY + y][meX + x].distance = 1; 
                else if(where === 2) {
                    map[meY + y][meX + x].distance = 2; 
                    fieldsToSearch.push({ y: meY + y, x: meX + x});
                }
                else console.warn("Unknown field");
            }
    } else fieldsToSearch.push({ y: meY, x: meX});
    console.log(fieldsToSearch);
    const dirs = [ { y: 0, x: 1 }, { y: 1, x: 0 }, { y: -1, x: 0 }, { y: 0, x: -1 }];
    while (fieldsToSearch.length > 0) {
        let { y, x } = fieldsToSearch.shift();
        let actualField = map[y][x];
        for (const dir of dirs) {
            let newField = map[y + dir.y][x + dir.x];
            if (newField.visited || newField.isWall) continue;
            newField.visited = true;
            newField.distance = actualField.distance + 1;
            if (actualField.isDoor) {
                if (actualField.behindDoors === null) newField.behindDoors = [ actualField.char ];
                else newField.behindDoors = [ ...actualField.behindDoors, actualField.char];
                //console.log(newField.behindDoors);
            } else if (actualField.behindDoors) {
                newField.behindDoors = actualField.behindDoors;
            }
            if (newField.isKey) 
            keys[newField.char] = newField.behindDoors ? newField.behindDoors.join("") : "free";

            fieldsToSearch.push( { y: y + dir.y , x: x + dir.x });
        }
    }
    for (let i = 65; i < 91; i++) {
        doorHideKeys[String.fromCharCode(i)] = [];
    }
    for (const key in keys) {
        if (keys[key] === "free") continue;
        for (const door of keys[key]) 
            doorHideKeys[door].push(key);
    }
    console.log(keys);
    console.log(doorHideKeys)
    return map;
};

const task1 = (data) => {
    
};

const task2 = data => {
    
}

let testdata = `########################
#f.D.E.e.C.b.A.@.a.B.c.#
######################.#
#d.....................#
########################`;

inputdata = prepare(splitLines(inputdata), "notest");

console.log(drawMapToHTML(inputdata, behindDoorsHTML));

//testdata = prepare(splitLines(testdata));

console.log("");

//doEqualTest(task1(testdata), 7);

//console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));