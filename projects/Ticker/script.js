function startTicker(id) {
    var ticker = document.getElementById(id);
    var wrapper = ticker.querySelector(".ticker-wrapper");
    // https://medium.com/@layne_celeste/htmlcollection-vs-nodelist-4b83e3a4fb4b
    var links = ticker.getElementsByTagName("a");

    var currentLeft = wrapper.offsetLeft;
    var currentLinkWidth = links[0].offsetWidth;
    var speed = 2; // adjust this to taste
    var animationID; // we need an external var to keep track of the animation ID

    wrapper.addEventListener("mouseenter", function () {
        console.log("hovering the wrapper", animationID);
        // to pause animation, use cancelAnimationFrame(id)
        window.cancelAnimationFrame(animationID);
    });

    wrapper.addEventListener("mouseleave", function () {
        console.log("leaving the wrapper");
        // we resume animation by calling the animationFunction again
        animationFunction();
    });

    var animationFunction = function () {
        currentLeft = currentLeft - speed;
        var isFirstLinkVisible = currentLeft + currentLinkWidth >= 0;
        console.log(currentLeft);
        //since currentLeft after the link leaves the page on the left side starts to be
        // a negative value, then it comes to a point when adding currentLinkWidth to current
        //left does not throws a poasitive result anymore, it throws a cero o negative value, this means the link is no longer visible.
        if (!isFirstLinkVisible) {
            // grants white space next to the first link. This means that the current left offset value for the wrapper
            //is calculated minding the width of the new tag closest to the left border.
            currentLeft = currentLeft + currentLinkWidth;
            // moves the first link to the end. Does BOTH things: Removes from top and adds at the end.
            wrapper.appendChild(links[0]);
            // updates the current link width to check
            currentLinkWidth = links[0].offsetWidth;
        }
        // we store the animation ID returned by requestAnimationFrame - see setInterval example
        animationID = window.requestAnimationFrame(animationFunction);
        // always remember, CSS style props are strings, and need a unit, in this case px
        wrapper.style.left = currentLeft + "px";
    };
    animationFunction();
}

// IIFE - you can move your code in another place if you like!
(function () {
    console.log("Ticker exercise");
    // we pass the id of the ticker as a parameter
    // in case we would like to manage more tickers in the future
    startTicker("myTicker");
})();
