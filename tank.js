const height = document.documentElement.clientHeight;
const width = document.documentElement.clientWidth;
var planted = false;
tank = document.getElementById("entrieslist");

mouseX = 0;
mouseY = 0;

function handleMouseMove(event) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    console.log('Mouse X:', mouseX, 'Mouse Y:', mouseY);
}

document.addEventListener('mousemove', handleMouseMove);

setInterval(() => {
    fishes = document.getElementsByClassName("swimmingfish");
    tanktop = tank.getBoundingClientRect().top + window.scrollY;
    tankbottom = tank.getBoundingClientRect().bottom + window.scrollY;
    tankleft = tank.getBoundingClientRect().left + window.scrollX;
    tankright = tank.getBoundingClientRect().right + window.scrollX;
    for (var j = 0; j < fishes.length; j++) {
        stepsize = 20;

        // random chance to make a big step
        if (Math.random() > 0.97) {
            stepsize = 100;
        }
        fish = fishes[j];
        fish.style.transition = ".5s top, .5s right";
        // print(fish.style.top);
        y = parseInt(fish.style.top || 0, 10);
        x = parseInt(fish.style.right || 0, 10);

        // // move fish up to step in each direction randomly
        let randY = Math.floor((Math.random() * stepsize)) - Math.floor(stepsize / 2);
        let randX = Math.floor((Math.random() * stepsize)) - Math.floor(stepsize / 2);

        // // do not go outside of tank
        // // that is, truncate to tank boundaries tanktop and tankbottom
        y = Math.min(Math.max(y + randY, tanktop + 20), tankbottom - 20);
        x = Math.min(Math.max(x + randX, tankleft + 20), tankright - 20);
        fish.style.top = y + "px";
        fish.style.right = x + "px";
    }
}, 100);

function plantFishes() {
    // randomly set positions of fish
    if (planted) {
        entrieslist = document.getElementById("entrieslist");
        entrieslist.style.height = "fit-content";
        entrieslist.style.width = "500px";
        planted = false;

        fishes = document.getElementsByClassName("swimmingfish");
        for (var j = 0; j < fishes.length; j++) {

            fish = fishes[j];
            fish.className = 'fish';
            j -= 1;
        }
        return;
    }
    entrieslist = document.getElementById("entrieslist");
    entrieslist.style.height = "300px";
    entrieslist.style.width = "100%";
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
        // console.log("planting fish");

        fish = fishes[j];
        fish.className = 'swimmingfish';

        // set fish position
        let randY = Math.floor((Math.random() * tankheight));
        let randX = Math.floor((Math.random() * tankwidth));

        y = tanktop + 50 + randY;
        x = tankleft + randX;
        console.log(randX, x, "ball");

        fish.style.top = y + "px";
        fish.style.right = x + "px";
        j -= 1;
    }
}

function scareFish(event) {
    tanktop = tank.getBoundingClientRect().top;
    tankbottom = tank.getBoundingClientRect().bottom;
    tankleft = tank.getBoundingClientRect().left;
    tankright = tank.getBoundingClientRect().right;
    mouseX = event.clientX;
    mouseY = event.clientY;
    scale = 5000;
    // Check if mouse is in tank
    console.log(tankleft, tankright, tanktop, tankbottom)
    if (mouseX >= tankleft && mouseX <= tankright && mouseY >= tanktop && mouseY <= tankbottom) {
        console.log("mouse in tank");
        fishes = document.getElementsByClassName("swimmingfish");
        // Push fish away from mouse in a random direction
        // there's some horrendous stuff here because I realize that some coordinates are from the left
        // and some are from the right
        // and also need to account for scrolling
        for (var j = 0; j < fishes.length; j++) {

            fish = fishes[j];
            fish.style.transition = ".5s top, .5s right";

            y = parseInt(fish.style.top || 0, 10) - window.scrollY;
            x = parseInt(fish.style.right || 0, 10);

            // get distance
            dist = Math.sqrt(Math.pow(width - mouseX - x, 2) + Math.pow(y - mouseY, 2));

            // get unit vector
            unitx = (width - mouseX - x) / dist;
            unity = (y - mouseY) / dist;

            // get new position
            tempx = x;
            tempy = y;
            x = x - unitx * scale / dist;
            y = y + unity * 4 * scale / dist + window.scrollY;

            // do not go outside of tank
            // that is, truncate to tank boundaries tanktop and tankbottom
            y = Math.min(Math.max(y, tanktop + window.scrollY + 20), tankbottom + window.scrollY - 20);
            x = Math.min(Math.max(x, 0), tankright - 20);
            fish.style.top = y + "px";
            fish.style.right = x + "px";

        }
    }
}

document.addEventListener("click", scareFish);