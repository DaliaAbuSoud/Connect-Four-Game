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
    let slots = columns.children();
    let victory = false;

    columns.on("click", function (e) {
        // Slots of Selected column
        let col = $(e.currentTarget);
        let slotsInCol = col.children();

        if (!victory) {
            // Loop over the slots from bottom row to top row to find the free slot.
            for (var i = slotsInCol.length - 1; i >= 0; i--) {
                if (
                    !slotsInCol.eq(i).hasClass("player1") &&
                    !slotsInCol.eq(i).hasClass("player2")
                ) {
                    slotsInCol
                        .eq(i)
                        .addClass(
                            `${currentPlayer} animate__animated animate__pulse`
                        );

                    break;
                }
            }

            if (i === -1) {
                return;
            }

            let slotsInRow = $(".row" + i);

            // Column Victory
            let whoWonHtml = "";
            if (checkForVictory(slotsInCol)) {
                if (currentPlayer === "player1") {
                    console.log("Column Victory, Manny Wins!");
                    whoWonHtml += "<h2>Manny Wins!</h2>";
                    $(".whoWon").html(whoWonHtml);
                    $(".whoWon").addClass("animate__animated animate__flip");
                    $(".whoWonWrapper").addClass("on");
                    $(".player1Score").addClass(
                        "animate__animated animate__heartBeat"
                    );
                    score("player1");
                    victory = true;
                } else {
                    console.log("Column Victory, Griffin Wins!");
                    whoWonHtml += "<h2>Griffin Wins!</h2>";
                    $(".whoWon").html(whoWonHtml);
                    $(".whoWon").addClass("animate__animated animate__flip");
                    $(".whoWonWrapper").addClass("on");
                    $(".player2Score").addClass(
                        "animate__animated animate__heartBeat"
                    );
                    score("player2");
                    victory = true;
                }

                // Row Victory
            } else if (checkForVictory(slotsInRow)) {
                if (currentPlayer === "player1") {
                    console.log("Rows Victory, Manny Wins!");
                    whoWonHtml += "<h2>Manny Wins!</h2>";
                    $(".whoWon").html(whoWonHtml);
                    $(".whoWon").addClass("animate__animated animate__flip");
                    $(".whoWonWrapper").addClass("on");
                    $(".player1Score").addClass(
                        "animate__animated animate__heartBeat"
                    );
                    score("player1");
                    victory = true;
                } else {
                    console.log("Rows Victory, Griffin Wins!");
                    whoWonHtml += "<h2>Griffin Wins!</h2>";
                    $(".whoWon").html(whoWonHtml);
                    $(".whoWon").addClass("animate__animated animate__flip");
                    $(".whoWonWrapper").addClass("on");
                    $(".player2Score").addClass(
                        "animate__animated animate__heartBeat"
                    );
                    score("player2");
                    victory = true;
                }
            } else if (checkForDiagonalVictory(slots)) {
                if (currentPlayer === "player1") {
                    console.log("Diagonal Victory, Manny Wins!");
                    whoWonHtml += "<h2>Manny Wins!</h2>";
                    $(".whoWon").html(whoWonHtml);
                    $(".whoWon").addClass("animate__animated animate__flip");
                    $(".whoWonWrapper").addClass("on");
                    $(".player1Score").addClass(
                        "animate__animated animate__heartBeat"
                    );
                    score("player1");
                    victory = true;
                } else {
                    console.log("Diagonal Victory, Griffin Wins!");
                    whoWonHtml += "<h2>Griffin Wins!</h2>";
                    $(".whoWon").html(whoWonHtml);
                    $(".whoWon").addClass("animate__animated animate__flip");
                    $(".whoWonWrapper").addClass("on");
                    $(".player2Score").addClass(
                        "animate__animated animate__heartBeat"
                    );
                    score("player2");
                    victory = true;
                }
            } else {
                switchPlayer();
            }
        } else {
            return;
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

    let player1Score = document.querySelector(".player1Score");
    let player2Score = document.querySelector(".player2Score");

    function score(player) {
        if (player === "player1") {
            player1Score.innerHTML = 1;
        } else {
            player2Score.innerHTML = 1;
        }
    }

    $(".playAgain").on("click", function () {
        for (var y = 0; y < slots.length; y++) {
            victory = false;
            player1Score.innerHTML = 0;
            player2Score.innerHTML = 0;
            $(".whoWonWrapper").removeClass("on");
            $(".whoWon").removeClass("animate__animated animate__flip");
            $(".player1Score").removeClass(
                "animate__animated animate__heartBeat"
            );
            $(".player2Score").removeClass(
                "animate__animated animate__heartBeat"
            );

            slots.eq(y).hasClass("player1")
                ? slots.eq(y).removeClass("player1")
                : slots.eq(y).removeClass("player2");
        }
    });

    function switchPlayer() {
        currentPlayer === "player1"
            ? (currentPlayer = "player2")
            : (currentPlayer = "player1");
    }
})();
