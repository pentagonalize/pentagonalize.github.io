const height = document.documentElement.clientHeight;
const width = document.documentElement.clientWidth;
var planted = false;
tank = document.getElementById("entrieslist");
mouseX = 0;
mouseY = 0;


setInterval(() => {
    fishes = document.getElementsByClassName("swimmingfish");
    tanktop = tank.getBoundingClientRect().top + window.scrollY;
    tankbottom = tank.getBoundingClientRect().bottom + window.scrollY;
    tankleft = tank.getBoundingClientRect().left + window.scrollX;
    tankright = tank.getBoundingClientRect().right + window.scrollX;
    for (var j = 0; j < fishes.length; j++) {
        stepsize = 40;

        // random chance to make a big step
        if (Math.random() > 0.99) {
            stepsize = 400;
        }
        fish = fishes[j];
        fish.style.transition = ".5s top, .5s right";
        y = parseInt(fish.style.top || 0, 10);
        x = parseInt(fish.style.right || 0, 10);

        // // move fish up to step in each direction randomly
        let randY = Math.floor((Math.random() * stepsize)) - Math.floor(stepsize / 2);
        let randX = Math.floor((Math.random() * stepsize)) - Math.floor(stepsize / 2);

        // // do not go outside of tank
        // // that is, truncate to tank boundaries tanktop and tankbottom
        y = Math.min(Math.max(y + randY, tanktop + 20), tankbottom - 20);
        x = Math.min(Math.max(x + randX, 10), width - 10);
        fish.style.top = y + "px";
        fish.style.right = x + "px";
    }
}, 200);

function plantFishes() {
    // randomly set positions of fish
    if (planted) {
        entrieslist = document.getElementById("entrieslist");
        planted = false;

        fishes = document.getElementsByClassName("swimmingfish");
        for (var j = 0; j < fishes.length; j++) {
            fish = fishes[j];
            if (fish.classList) {
                fish.classList.remove('swimmingfish');
                fish.classList.add('fish');
            } else {
                const classes = (fish.className || '').split(/\s+/).filter(Boolean);
                const newClasses = classes.filter(c => c !== 'swimmingfish');
                newClasses.push('fish');
                fish.className = newClasses.join(' ');
            }
            j -= 1;
        }

        return;

    }

    entrieslist = document.getElementById("entrieslist");
    planted = true;
    fishes = document.getElementsByClassName("fish");

    tank = document.getElementById("entrieslist");
    tanktop = tank.getBoundingClientRect().top;
    tankbottom = tank.getBoundingClientRect().bottom;
    tankleft = tank.getBoundingClientRect().left;
    tankright = tank.getBoundingClientRect().right;
    tankheight = tank.getBoundingClientRect().height;
    tankwidth = tank.getBoundingClientRect().width;


    for (var j = 0; j < fishes.length; j++) {
        fish = fishes[j];
        // replace only the "fish" token with "swimmingfish", preserving any other classes (e.g. branch type)
        if (fish.classList) {
            fish.classList.remove('fish');
            fish.classList.add('swimmingfish');
        } else {
            const classes = (fish.className || '').split(/\s+/).filter(Boolean);
            const newClasses = classes.filter(c => c !== 'fish');
            newClasses.push('swimmingfish');
            fish.className = newClasses.join(' ');
        }

        // set fish position
        let randY = Math.floor((Math.random() * tankheight));
        let randX = Math.floor((Math.random() * tankwidth));

        y = tanktop + 50 + randY;
        x = tankleft + randX;

        fish.style.top = y + "px";
        fish.style.right = x + "px";
        j -= 1;
    }
}

function scareFish(event, val) {
    tanktop = tank.getBoundingClientRect().top;
    tankbottom = tank.getBoundingClientRect().bottom;
    tankleft = tank.getBoundingClientRect().left;
    tankright = tank.getBoundingClientRect().right;
    mouseX = event.clientX;
    mouseY = event.clientY;
    scale = 50000;
    // If shift is held, reverse behavior to attract fish
    const modeMultiplier = val
    fishes = document.getElementsByClassName("swimmingfish");
    ball = document.getElementById("ball");

    for (var j = 0; j < fishes.length; j++) {

        fish = fishes[j];
        fish.style.transition = ".5s top, .5s right";

        y = parseInt(fish.style.top || 0, 10) - window.scrollY;
        x = parseInt(fish.style.right || 0, 10);

        // get distance
        dist = Math.sqrt(Math.pow(width - mouseX - x - fish.offsetWidth / 2, 2) + Math.pow(y - mouseY, 2));
        if (!dist) continue; // avoid division by zero

        // get unit vector
        unitx = (width - mouseX - x - fish.offsetWidth / 2) / dist;
        unity = (y - mouseY) / dist;

        // update position: multiplier switches between scare (-1) and attract (+1)
        x = x + modeMultiplier * unitx * scale / dist;
        y = y - modeMultiplier * unity * 2 * scale / dist + window.scrollY;

        // do not go outside of tank
        y = Math.min(Math.max(y, tanktop + window.scrollY + 20), tankbottom + window.scrollY - 20);
        x = Math.min(Math.max(x, 10), width - 10);
        fish.style.top = y + "px";
        fish.style.right = x + "px";
    }
}


document.onclick = event => {
    if (event.detail === 1) {
        scareFish(event, 1);
        console.log("single click");
        // it was a single click
    }
};