const btn = document.querySelector("button");
const height = document.documentElement.clientHeight;
const width = document.documentElement.clientWidth;
const tank = document.getElementById("entrieslist");
const fishes = document.getElementsByClassName("fish");
const tanktop = tank.getBoundingClientRect().top;
const tankbottom = tank.getBoundingClientRect().bottom;
var planted = false;


setInterval(() => {
    for (var j = 0; j < fishes.length; j++) {
        stepsize = 100;
        fish = fishes[j];
        fish.style.transition = "1s top, 1s right";
        // print(fish.style.top);
        y = parseInt(fish.style.top || 0, 10);
        x = parseInt(fish.style.right || 0, 10);

        // move fish up to step in each direction randomly
        let randY = Math.floor((Math.random() * stepsize)) - Math.floor(stepsize / 2);
        let randX = Math.floor((Math.random() * stepsize)) - Math.floor(stepsize / 2);
        console.log(y, randY, x, randX);

        // do not go outside of tank
        // that is, truncate to tank boundaries tanktop and tankbottom
        // console.log(tanktop, tankbottom);
        y = Math.min(Math.max(y + randY, tanktop), tankbottom);
        x = Math.min(Math.max(x + randX, 0), width);

        fish.style.top = y + "px";
        fish.style.right = x + "px";
    }
}, 50); // every 1/2 second

function plantFishes() {
    // randomly set positions of fish
    if (planted) {
        return;
    }
    for (var j = 0; j < fishes.length; j++) {
        fish = fishes[j];
        fish.style.transition = "";
        // set fish position
        let randY = Math.floor((Math.random() * (tankbottom - tanktop)));
        let randX = Math.floor((Math.random() * width));

        y = Math.min(Math.max(tanktop + randY, tanktop), tankbottom);
        x = Math.min(Math.max(randX, 0), width);

        fish.style.top = y + "px";
        fish.style.right = x + "px";
    }

}