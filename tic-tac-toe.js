"use strict";

window.addEventListener('DOMContentLoaded', (event) => {
    main();
});

const val = [null, null, null, null, null, null, null, null, null];
let turn = 0;


function main() {

    let button = document.getElementsByClassName("btn")[0];

    button.setAttribute("onclick", "startGame();");

    button.addEventListener('mouseover', function (b) {
        b.target.classList.add('hover');
    });
    button.addEventListener('mouseout', function (b) {
        b.target.classList.remove('hover');
    });
}

function startGame() {
    restart();

    let gamesquares = document.querySelectorAll('#board > div');

    gamesquares.forEach(function(element, index = 0) {        
        element.classList.add("square");
        element.setAttribute("id", "b" + (index++)); 
        element.addEventListener('mouseover', function (e) {
            e.target.classList.add('hover');
        });
        element.addEventListener('mouseout', function (e) {
            e.target.classList.remove('hover');
        });
        element.addEventListener("click", function () { select(this.getAttribute("id")); });
    } );
};


function select(gamesquare) {
    let squares = parseInt(gamesquare[1],9);
    let indx = squares;
    
    let getID = document.getElementById(gamesquare);

    if (turn < 9 && val[indx] == null) {
        turn++;
        if (turn % 2 == 0) {
            console.log(val);
            val[indx] = "O";
            console.log(val);
            getID.classList.add("O");
            getID.innerHTML = "O";
        } else {
            console.log(val);
            val[indx] = "X";
            console.log(val);
            getID.classList.add("X");
            getID.innerHTML = "X";
        }

        // registers a winner where cum_count [x,x,x] or [o, o, o]
        let results = cum_count();
        results.forEach((elm) => {
            if (elm === "X" || elm === "O") { winner(elm); }
        })

        // registers tie 
        if (turn === 9) {
            cum_count();
            if (results[0] === "no-match" && results[0] === results[1] && results[1] === results[2]) {
                stat = document.getElementById("status").innerHTML = "It's a Draw!";
            }
            end();
        }

    }

}

//update status to express winner
function winner(winner) {
    let stat = document.getElementById("status");
    stat.classList.add("you-won");
    winner === "X" ? stat.innerHTML = "Congratulations! X is the Winner" : stat.innerHTML = "Congratulations! O is the Winner";
    end();
}

// following keeping track of each item in graph to check for winner 
function strike(list, start, end, increment, pointer, basecase) {
    let base = 0;
    for (let i = start; i < end; i += increment) {
        if (basecase) base = i;
        if (list[i] === list[i + pointer - base] && list[i + pointer - base] === list[i + pointer + pointer - base - base]) {
            return list[i];
        }
    }
    return "no-match";
}

function cum_count() {
    let col = strike(val, 0, 3, 1, 3, false);
    let row = strike(val, 0, 9, 3, 1, false);
    let diag = strike(val, 0, 3, 2, 4, true);
    return [col, row, diag];
}


// Following will reset all state
function updateLayout() {

    let gamesquares = document.querySelectorAll('#board > div');

    gamesquares.forEach(function (element) {
        element.innerHTML === "X" ? element.classList.remove("X") : element.classList.remove("O");
        element.innerHTML = "";
        element.setAttribute("id", "");
        element.classList.remove("square");
    });

    let stat = document.getElementById("status");
    stat.innerHTML = "Move your mouse over a square and click to play an X or an O.";
    stat.classList.remove("you-won");
}

function updateVal() {
    for (let v = 0; v < val.length; v++) {
        val[v] = null;
    }
}

function updateButton() {
    document.getElementsByTagName("button")[0].innerHTML = "New game";
    document.getElementsByTagName("button")[0].setAttribute("onclick", "startGame()");
}

function restart() {
    updateLayout();
    updateVal();
    turn = 0;
    updateButton();

}

function end() {
    let controlbutton = document.getElementsByTagName("button")[0];
    controlbutton.innerHTML = "Star Over";
    controlbutton.setAttribute("onclick", "restart();");
}








 

