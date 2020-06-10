(function () {
    let currentPlayer = "player1";
    let column = $(".column");

    column.on("click", function (e) {
        let targetColumn = $(e.currentTarget);
        let slotsInColumn = targetColumn.children();
        let columnIndex = targetColumn.index();

        console.log("targetColumn:", targetColumn);
        console.log("slotsInColumn:", slotsInColumn);
        console.log("columnIndex:", columnIndex);

        //find first available slot from bottom
        for (var i = slotsInColumn.length - 1; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass("player1") &&
                !slotsInColumn.eq(i).hasClass("player2")
            ) {
                slotsInColumn.eq(i).addClass(currentPlayer);
                break;
            }
        }
        let rowIndex = i;
        let slotsInRow = $(".row" + i);
        console.log("rowIndex:", rowIndex);
        console.log("slotsInRow:", slotsInRow);

        // Switch players if one column in full
        if (i === -1) {
            return;
        }

        //Check for Vectories
        if (checkForVictory(slotsInColumn)) {
            console.log("There Was A Column Victory!!!");
        } else if (checkForVictory(slotsInRow)) {
            console.log("There Was A Row Victory!!!");
        } else {
            console.log("There Was No Victory :(");
        }
        switchPlayer();
        checkForVictory(slotsInColumn);
    });

    function checkForVictory(slots) {
        let count = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                count++;

                console.log("count:", count);

                if (count === 4) {
                    return true;
                } else {
                    // reset the count back to find another player
                    count = 0;
                }
            }
        }
    }
    //Switch players
    function switchPlayer() {
        if (currentPlayer === "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }
})();
