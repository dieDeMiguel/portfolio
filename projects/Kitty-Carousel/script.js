var timeInterval = 2000;

var carousel = document.querySelector(".carousel");
var kitties = carousel.querySelectorAll(".kitty");
var dots = carousel.querySelectorAll(".dots li");

var current = 0;
var next = 1;

function updateDots(selectedIndex) {
    dots.forEach(function (dot) {
        dot.classList.remove("current");
    });
    dots[selectedIndex].classList.add("current");
}

function moveKitties() {
    updateDots(next);
    var currentKitty = kitties[current];
    var nextKitty = kitties[next];

    currentKitty.classList.remove("onscreen");
    currentKitty.classList.add("exit");

    nextKitty.classList.add("onscreen");

    current = next;

    if (next === kitties.length - 1) {
        next = 0;
    } else {
        next++;
    }
}

carousel.addEventListener("transitionend", function (event) {
    if (event.target.classList.contains("exit")) {
        event.target.classList.remove("exit");
        setTimeout(moveKitties, timeInterval);
    }
});

setTimeout(moveKitties, timeInterval);
