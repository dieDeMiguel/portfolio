(function () {
    console.log("Connect four!");
    var $boardGame = $(".board-game");
    var $columns = $boardGame.find(".column");
    var $allTheSlots = $(".slot");
    var player = 1;

    function changePlayer() {
        if (player === 1) {
            player = 2;
        } else {
            player = 1;
        }
    }

    function placeCoinOrReject(position, columns) {
        var $class = "player-" + player;
        if (position === -1) {
            return false;
        } else {
            columns.eq(position).addClass($class);
            return true;
        }
    }

    function firstEmptySlot(slots) {
        var $counter = -1;
        for (var i = 0; i < slots.length; i++) {
            $currentSlot = slots.eq(i);
            slotTakenOrNot =
                $currentSlot.hasClass("player-1") ||
                $currentSlot.hasClass("player-2");
            if (!slotTakenOrNot) {
                $counter++;
            } else if (slotTakenOrNot) {
                break;
            }
        }
        return $counter;
    }

    function getCoinPositionInGrid(coinPosition, column) {
        if (column === 0) {
            return coinPosition;
        } else {
            return coinPosition + 6 * column;
        }
    }

    function checkVictory($slots) {
        var $count = 0;
        for (let i = 0; i < $slots.length; i++) {
            var $class = "player-" + player;
            var $hasClass = $slots.eq(i).hasClass($class);
            if ($hasClass) {
                $count++;
                if ($count === 4) {
                    setTimeout(() => {
                        alert(
                            "Player #" +
                                (player === 1 ? 2 : 1) +
                                " won the match"
                        );
                        resetGame();
                    }, 101);
                }
            } else {
                $count = 0;
            }
        }
    }

    function resetGame() {
        for (let i = 0; i < $allTheSlots.length; i++) {
            if ($allTheSlots.eq(i).hasClass("player-1")) {
                $allTheSlots.eq(i).removeClass("player-1");
            } else if ($allTheSlots.eq(i).hasClass("player-2")) {
                $allTheSlots.eq(i).removeClass("player-2");
            }
            player = 1;
        }
    }

    function checkVerticalVictory(index) {
        //Diego's approach, only here to be available in the future.
        var $slots = $columns.map(function () {
            return $(this).find(".slot").eq(index)[0];
        });

        var $columnToCheck = $boardGame.find(".column").eq(index);
        checkVictory($columnToCheck.children());
    }

    function checkHorizontalWin(row) {
        var $collection = $();
        for (let i = 0; i < $columns.length; i++) {
            $slotsInColumn = $columns.eq(i).children();
            $slotInRow = $slotsInColumn.eq(row);
            $collection = $collection.add($slotInRow);
        }
        checkVictory($collection);
    }

    function checkDiagonalVictory(slot) {
        var $collection = $();
        var $slot1 = slot;
        $collection = $collection.add($allTheSlots.eq($slot1));
        while ($slot1 < 42) {
            $slot1 = $slot1 + 7;
            $collection = $collection.add($allTheSlots.eq($slot1));
        }

        checkVictory($collection);

        var $collection = $();
        var $slot2 = slot;
        $collection = $collection.add($allTheSlots.eq($slot2));
        while ($slot2 < 42) {
            $slot2 = $slot2 + 5;
            $collection = $collection.add($allTheSlots.eq($slot2));
        }

        checkVictory($collection);

        var $collection = $();
        var $slot3 = slot;
        $collection = $collection.add($allTheSlots.eq($slot3));
        while ($slot3 >= 0) {
            $slot3 = $slot3 - 5;
            $collection = $collection.add($allTheSlots.eq($slot3));
        }

        checkVictory($collection);

        var $collection = $();
        var $slot4 = slot;
        $collection = $collection.add($allTheSlots.eq($slot4));
        while ($slot4 >= 0) {
            $slot4 = $slot4 - 7;
            $collection = $collection.add($allTheSlots.eq($slot4));
        }

        checkVictory($collection);
    }

    $columns.on("click", function () {
        var $this = $(this);
        var $column = $this;
        var $coinPosition = firstEmptySlot($column.find(".slot"));
        var rejectedOrNot = placeCoinOrReject(
            $coinPosition,
            $column.find(".slot")
        );
        if (rejectedOrNot) {
            checkVerticalVictory($columns.index($column));
            checkHorizontalWin($coinPosition);
            var $addedCoinIndex = getCoinPositionInGrid(
                $coinPosition,
                $columns.index($column)
            );
            checkDiagonalVictory($addedCoinIndex);
            changePlayer();
        }
    });
})();
