function searchCountries(countries, text) {
    var results = [];
    for (var i = 0; i < countries.length; i++) {
        var country = countries[i].toLowerCase();
        var condition = false;
        if (country.startsWith(text)) {
            if (results.length > 3) {
                condition = true;
            }
            if (!condition) {
                results.push(countries[i]);
            }
        }
    }
    return results;
}

//IIFE
(function () {
    // cache jQuery selectors
    var $searchContainer = $("#mySearch");
    var $input = $searchContainer.find("input");
    var $suggestionList = $searchContainer.find(".suggestions");
    var ajaxUrl = "https://spicedworld.herokuapp.com";

    // remember the event delegation problem!
    function clickHandler() {
        var $this = $(this);
        if ($this.html() === "No results") {
            return;
        }
        $input.val($this.text());
    }

    $suggestionList.on("mousedown", "li", clickHandler);

    function inputHandler() {
        var value = $(this).val().trim().toLowerCase();
        if (value.length === 0) {
            $suggestionList.toggleClass("show-results");
            $suggestionList.css("display", "none");
            return;
        }

        $.get(ajaxUrl, { q: value }, renderResults);

        //$suggestionList.removeClass("inactive");
        function renderResults(array) {
            var results = searchCountries(array, value);

            $suggestionList.empty();
            if (results.length === 0 && value.length > 0) {
                $suggestionList.show();
                $suggestionList.append("<li>No results</li>");
            } else {
                $suggestionList.show();
                for (let i = 0; i < results.length; i++) {
                    $suggestionList.append("<li>" + results[i] + "</li>");
                }
            }
            return results;
        }
    }

    function keydownHandler(event) {
        $currentItem = $suggestionList.find(".current");
        $currentPosition = $suggestionList.find("li").index(".current");
        switch (event.key) {
            case "ArrowUp":
                if ($currentItem.length === 0) {
                    $suggestionList.find("li").last().addClass("current");
                }
                $currentItem.removeClass("current");
                $currentItem.prev().addClass("current");
                break;
            case "ArrowDown":
                if ($currentItem.length === 0) {
                    $suggestionList.find("li").first().addClass("current");
                }
                $currentItem.removeClass("current");
                $currentItem.next().addClass("current");
                break;
            case "Enter":
                var currentValue = $currentItem.text();
                $input.val(currentValue);
                $suggestionList.css("display", "none");
                break;
            case "Escape":
                $searchContainer.removeClass("show-results");
                $suggestionList.css("display", "none");
        }
    }

    $input.on("input", inputHandler);
    $input.on("focus", function () {
        var value = $input.val().trim().toLowerCase();
        if (value.length > 0) {
            $suggestionList.toggleClass("show-results");
            $suggestionList.show();
        }
    });
    $input.on("blur", function () {
        $searchContainer.removeClass("show-results");
        $suggestionList.hide();
    });
    $input.on("keydown", keydownHandler);
})();
