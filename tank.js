const height = document.documentElement.clientHeight;
const width = document.documentElement.clientWidth;
var planted = false;
tank = document.getElementById("entrieslist");
tanktop = tank.getBoundingClientRect().top;
tankbottom = tank.getBoundingClientRect().bottom;

setInterval(() => {
    fishes = document.getElementsByClassName("swimmingfish");
    for (var j = 0; j < fishes.length; j++) {
        stepsize = 40;

        // random chance to make a big step
        if (Math.random() > 0.95) {
            stepsize = 800;
        }
        fish = fishes[j];
        fish.style.transition = ".5s top, .5s right";
        // print(fish.style.top);
        y = parseInt(fish.style.top || 0, 10);
        x = parseInt(fish.style.right || 0, 10);

        // move fish up to step in each direction randomly
        let randY = Math.floor((Math.random() * stepsize)) - Math.floor(stepsize / 2);
        let randX = Math.floor((Math.random() * stepsize)) - Math.floor(stepsize / 2);
        // console.log(y, randY, x, randX);

        // do not go outside of tank
        // that is, truncate to tank boundaries tanktop and tankbottom
        // console.log(tanktop, tankbottom);
        y = Math.min(Math.max(y + randY, tanktop + 80), tankbottom);
        x = Math.min(Math.max(x + randX, 0), width);
        fish.style.top = y + "px";
        fish.style.right = x + "px";
    }
}, 100); // every 1/2 second

function plantFishes() {
    // randomly set positions of fish
    if (planted) {
        entrieslist = document.getElementById("entrieslist");
        entrieslist.style.height = "fit-content";
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
    planted = true;
    fishes = document.getElementsByClassName("fish");


    tank = document.getElementById("entrieslist");
    tankheight = tank.getBoundingClientRect().height;
    tankwidth = tank.getBoundingClientRect().width;

    console.log(tanktop, tankbottom);
    for (var j = 0; j < fishes.length; j++) {
        // console.log("planting fish");

        fish = fishes[j];
        fish.className = 'swimmingfish';

        // set fish position
        let randY = Math.floor((Math.random() * tankheight));
        let randX = Math.floor((Math.random() * tankwidth));

        y = tanktop + 90 + randY;
        x = randX;
        console.log(y);

        fish.style.top = y + "px";
        fish.style.right = x + "px";
        j -= 1;
    }
}