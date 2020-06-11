(function () {
    let diagonalVictories = [
        [0, 7, 14, 21],
        [1, 8, 15, 22],
        [2, 9, 16, 23],
        [3, 8, 13, 18],
        [4, 9, 14, 19],
        [5, 10, 15, 20],
        [6, 13, 20, 27],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [9, 14, 19, 24],
        [10, 15, 20, 25],
        [11, 16, 21, 26],
        [12, 19, 26, 33],
        [13, 20, 27, 34],
        [14, 21, 28, 35],
        [15, 20, 25, 30],
        [16, 21, 26, 31],
        [17, 22, 27, 32],
        [18, 25, 32, 39],
        [19, 26, 33, 40],
        [20, 27, 34, 41],
        [21, 26, 31, 36],
        [22, 27, 31, 37],
        [23, 28, 33, 38],
    ];

    let currentPlayer = "player1";
    let columns = $(".column");
    let allSlots = columns.children();

    columns.on("click", function (e) {
        // Slots of Selected column
        let col = $(e.currentTarget);
        let slotsInCol = col.children();

        // Loop over the slots from bottom row to top row to find the free slot.
        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                slotsInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }

        let slotsInRow = $(".row" + i);

        if (i === -1) {
            return;
        }
        // Column Victory
        let whoWinWrapperHtml = "";
        if (checkForVictory(slotsInCol)) {
            if (currentPlayer === "player1") {
                console.log("Column Victory, Player 1 Wins!");
                whoWinWrapperHtml += "<h2>Player 1 wins!</h2>";
                $(".whoWonWrapper").html(whoWinWrapperHtml);
                $(".whoWonWrapper").addClass("on");
            } else {
                console.log("Column Victory, Player 2 Wins!");
                whoWinWrapperHtml += "<h2>Player 2 wins!</h2>";
                $(".whoWonWrapper").html(whoWinWrapperHtml);
                $(".whoWonWrapper").addClass("on");
            }

            // Row Victory
        } else if (checkForVictory(slotsInRow)) {
            if (currentPlayer === "player1") {
                console.log("Rows Victory, Player 1 Wins!");
                whoWinWrapperHtml += "<h2>Player 1 wins!</h2>";
                $(".whoWonWrapper").html(whoWinWrapperHtml);
                $(".whoWonWrapper").addClass("on");
            } else {
                console.log("Rows Victory, Player 2 Wins!");
                whoWinWrapperHtml += "<h2>Player 2 wins!</h2>";
                $(".whoWonWrapper").html(whoWinWrapperHtml);
                $(".whoWonWrapper").addClass("on");
            }
        } else if (checkForDiagonalVictory(allSlots)) {
            if (currentPlayer === "player1") {
                console.log("Diagonal Victory, Player 1 Wins!");
                whoWinWrapperHtml += "<h2>Player 1 wins!</h2>";
                $(".whoWonWrapper").html(whoWinWrapperHtml);
                $(".whoWonWrapper").addClass("on");
            } else {
                console.log("Diagonal Victory, Player 2 Wins!");
                whoWinWrapperHtml += "<h2>Player 2 wins!</h2>";
                $(".whoWonWrapper").html(whoWinWrapperHtml);
                $(".whoWonWrapper").addClass("on");
            }
        } else {
            switchPlayer();
        }
    });

    function checkForVictory(slots) {
        let count = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                count++;
                if (count === 4) {
                    return true;
                }
            } else {
                // reset the count to 0 to find the other player or end game.
                count = 0;
            }
        }
    }

    function checkForDiagonalVictory(slots) {
        let count = 0;
        for (var i = 0; i < diagonalVictories.length; i++) {
            for (var x = 0; x < diagonalVictories[i].length; x++) {
                // set "index" to the value of a winning slot
                var index = diagonalVictories[i][x];
                if (slots.eq(index).hasClass(currentPlayer)) {
                    count++;
                    if (count === 4) {
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }
    }

    // $("#again").on("click", function () {
    //     for (var s = 0; s < allSlots.length; s++) {
    //         allSlots.eq(s).hasClass("player1")
    //             ? allSlots.eq(s).removeClass("player1")
    //             : allSlots.eq(s).removeClass("player2");
    //     }
    // });

    function switchPlayer() {
        currentPlayer === "player1"
            ? (currentPlayer = "player2")
            : (currentPlayer = "player1");
    }
})();
