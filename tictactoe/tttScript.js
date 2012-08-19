var tile1;
var tile2;
var tile3;
var tile4;
var tile5;
var tile6;
var tile7;
var tile8;
var tile9;
var gameOver = false;
var availableTiles = 9;
var spotToBlock;
var spotToFinish;
var outOfTiles = false;

function toggleUserTile(e) {
	if( e.target.getAttribute("src") != "blank.jpg") return;
	if( gameOver ) return;
	
	e.target.setAttribute("src","x.jpg");
	availableTiles--;

	gameOver = checkForWinner();
	if (gameOver) {
		if( outOfTiles) {
			document.getElementById("messages").innerHTML = "<h1>TIE</h1><input id=\"reset\" type=\"button\" value=\"New Game\">";		
		}
		else {
			document.getElementById("messages").innerHTML = "<h1>YOU LOSE</h1><input id=\"reset\" type=\"button\" value=\"New Game\">";
		}
		document.getElementById("reset").addEventListener("click", reset, false);
	} else {
		toggleComputerTile();
	}
}

function toggleComputerTile() {
	if( tile5.getAttribute("src") == "blank.jpg") {
		tile5.setAttribute("src", "o.jpg");
	} else if (availableTiles == 8) {
		tile1.setAttribute("src", "o.jpg");
	} else if (compIsAboutToWin()) {
		finishIt();
	} else if (userIsAboutToWin()) {
		block();
	} else if (userHasCorners()) {
		if( tile2.getAttribute("src") == "blank.jpg") tile2.setAttribute("src", "o.jpg");
		else findBestSpot();
	} else {
		findBestSpot();
	}
	
	gameOver = checkForWinner();
	
	if (gameOver) {
		if(outOfTiles) {
			document.getElementById("messages").innerHTML = "<h1>TIE</h1><input id=\"reset\" type=\"button\" value=\"New Game\">";		
		}
		else {
			document.getElementById("messages").innerHTML = "<h1>YOU LOSE</h1><input id=\"reset\" type=\"button\" value=\"New Game\">";
		}
		document.getElementById("reset").addEventListener("click", reset, false);
	}
	availableTiles--;
}

function userHasCorners() {
	if( tile1.getAttribute("src") == "x.jpg" && tile9.getAttribute("src") == "x.jpg") return true;
	if( tile3.getAttribute("src") == "x.jpg" && tile7.getAttribute("src") == "x.jpg") return true;
	
	return false;
}

function findBestSpot() {
	if( tile1.getAttribute("src") == "blank.jpg" ) {
		tile1.setAttribute("src", "o.jpg");
	} else if( tile3.getAttribute("src") == "blank.jpg" ) {
		tile3.setAttribute("src", "o.jpg");
	} else if( tile7.getAttribute("src") == "blank.jpg" ) {
		tile7.setAttribute("src", "o.jpg");
	} else if( tile9.getAttribute("src") == "blank.jpg" ) {
		tile9.setAttribute("src", "o.jpg");
	}
	else {
		for( var i=1; i<10; i++) 
		{
			if( document.getElementById("tile" + i).getAttribute("src") == "blank.jpg") {
				document.getElementById("tile" + i).setAttribute("src", "o.jpg");
				return;
			}
		}
	}
}

function userIsAboutToWin() {
	if( tile1.getAttribute("src") == "x.jpg" && tile2.getAttribute("src") == "x.jpg" && tile3.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 3;
		return true;
	} else if( tile2.getAttribute("src") == "x.jpg" && tile3.getAttribute("src") == "x.jpg" && tile1.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 1;
		return true;
	} else if( tile1.getAttribute("src") == "x.jpg" && tile3.getAttribute("src") == "x.jpg" && tile2.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 2;
		return true; //end row 1
	} else if( tile4.getAttribute("src") == "x.jpg" && tile5.getAttribute("src") == "x.jpg" && tile6.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 6;
		return true;
	} else if( tile5.getAttribute("src") == "x.jpg" && tile6.getAttribute("src") == "x.jpg" && tile4.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 4
		return true;
	} else if( tile4.getAttribute("src") == "x.jpg" && tile6.getAttribute("src") == "x.jpg" && tile5.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 5;
		return true; //end row 2
	} else if( tile7.getAttribute("src") == "x.jpg" && tile8.getAttribute("src") == "x.jpg" && tile9.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 9;
		return true;
	} else if( tile7.getAttribute("src") == "x.jpg" && tile9.getAttribute("src") == "x.jpg" && tile8.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 8;
		return true;
	} else if( tile8.getAttribute("src") == "x.jpg" && tile9.getAttribute("src") == "x.jpg" && tile7.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 7;
		return true; //end row 3
	} else if( tile1.getAttribute("src") == "x.jpg" && tile4.getAttribute("src") == "x.jpg" && tile7.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 7;
		return true;
	} else if( tile1.getAttribute("src") == "x.jpg" && tile7.getAttribute("src") == "x.jpg" && tile4.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 4;
		return true;
	} else if( tile4.getAttribute("src") == "x.jpg" && tile7.getAttribute("src") == "x.jpg" && tile1.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 1;
		return true; //end column 1
	} else if( tile2.getAttribute("src") == "x.jpg" && tile5.getAttribute("src") == "x.jpg" && tile8.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 8;
		return true;
	} else if( tile2.getAttribute("src") == "x.jpg" && tile8.getAttribute("src") == "x.jpg" && tile5.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 5;
		return true;
	} else if( tile5.getAttribute("src") == "x.jpg" && tile8.getAttribute("src") == "x.jpg" && tile2.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 2;
		return true; //end column 2
	} else if( tile3.getAttribute("src") == "x.jpg" && tile6.getAttribute("src") == "x.jpg" && tile9.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 9;
		return true;
	} else if( tile3.getAttribute("src") == "x.jpg" && tile9.getAttribute("src") == "x.jpg" && tile6.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 6;
		return true;
	} else if( tile6.getAttribute("src") == "x.jpg" && tile9.getAttribute("src") == "x.jpg" && tile3.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 3;
		return true; //end column 3
	} else if( tile1.getAttribute("src") == "x.jpg" && tile5.getAttribute("src") == "x.jpg" && tile9.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 9;
		return true;
	} else if( tile1.getAttribute("src") == "x.jpg" && tile9.getAttribute("src") == "x.jpg" && tile5.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 5;
		return true;
	} else if( tile5.getAttribute("src") == "x.jpg" && tile9.getAttribute("src") == "x.jpg" && tile1.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 1;
		return true; //end negative slope diagonal
	} else if( tile3.getAttribute("src") == "x.jpg" && tile5.getAttribute("src") == "x.jpg" && tile7.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 7;
		return true;
	} else if( tile3.getAttribute("src") == "x.jpg" && tile7.getAttribute("src") == "x.jpg" && tile5.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 5;
		return true;
	} else if( tile7.getAttribute("src") == "x.jpg" && tile5.getAttribute("src") == "x.jpg" && tile3.getAttribute("src") == "blank.jpg" ) {
		spotToBlock = 3;
		return true; //end positive slope diagonal
	} else {
		return false;
	}
}

function compIsAboutToWin() {
	if( tile1.getAttribute("src") == "o.jpg" && tile2.getAttribute("src") == "o.jpg" && tile3.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 3;
		return true;
	} else if( tile2.getAttribute("src") == "o.jpg" && tile3.getAttribute("src") == "o.jpg" && tile1.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 1;
		return true;
	} else if( tile1.getAttribute("src") == "o.jpg" && tile3.getAttribute("src") == "o.jpg" && tile2.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 2;
		return true; //end row 1
	} else if( tile4.getAttribute("src") == "o.jpg" && tile5.getAttribute("src") == "o.jpg" && tile6.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 6;
		return true;
	} else if( tile5.getAttribute("src") == "o.jpg" && tile6.getAttribute("src") == "o.jpg" && tile4.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 4
		return true;
	} else if( tile4.getAttribute("src") == "o.jpg" && tile6.getAttribute("src") == "o.jpg" && tile5.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 5;
		return true; //end row 2
	} else if( tile7.getAttribute("src") == "o.jpg" && tile8.getAttribute("src") == "o.jpg" && tile9.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 9;
		return true;
	} else if( tile7.getAttribute("src") == "o.jpg" && tile9.getAttribute("src") == "o.jpg" && tile8.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 8;
		return true;
	} else if( tile8.getAttribute("src") == "o.jpg" && tile9.getAttribute("src") == "o.jpg" && tile7.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 7;
		return true; //end row 3
	} else if( tile1.getAttribute("src") == "o.jpg" && tile4.getAttribute("src") == "o.jpg" && tile7.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 7;
		return true;
	} else if( tile1.getAttribute("src") == "o.jpg" && tile7.getAttribute("src") == "o.jpg" && tile4.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 4;
		return true;
	} else if( tile4.getAttribute("src") == "o.jpg" && tile7.getAttribute("src") == "o.jpg" && tile1.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 1;
		return true; //end column 1
	} else if( tile2.getAttribute("src") == "o.jpg" && tile5.getAttribute("src") == "o.jpg" && tile8.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 8;
		return true;
	} else if( tile2.getAttribute("src") == "o.jpg" && tile8.getAttribute("src") == "o.jpg" && tile5.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 5;
		return true;
	} else if( tile5.getAttribute("src") == "o.jpg" && tile8.getAttribute("src") == "o.jpg" && tile2.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 2;
		return true; //end column 2
	} else if( tile3.getAttribute("src") == "o.jpg" && tile6.getAttribute("src") == "o.jpg" && tile9.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 9;
		return true;
	} else if( tile3.getAttribute("src") == "o.jpg" && tile9.getAttribute("src") == "o.jpg" && tile6.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 6;
		return true;
	} else if( tile6.getAttribute("src") == "o.jpg" && tile9.getAttribute("src") == "o.jpg" && tile3.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 3;
		return true; //end column 3
	} else if( tile1.getAttribute("src") == "o.jpg" && tile5.getAttribute("src") == "o.jpg" && tile9.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 9;
		return true;
	} else if( tile1.getAttribute("src") == "o.jpg" && tile9.getAttribute("src") == "o.jpg" && tile5.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 5;
		return true;
	} else if( tile5.getAttribute("src") == "o.jpg" && tile9.getAttribute("src") == "o.jpg" && tile1.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 1;
		return true; //end negative slope diagonal
	} else if( tile3.getAttribute("src") == "o.jpg" && tile5.getAttribute("src") == "o.jpg" && tile7.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 7;
		return true;
	} else if( tile3.getAttribute("src") == "o.jpg" && tile7.getAttribute("src") == "o.jpg" && tile5.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 5;
		return true;
	} else if( tile7.getAttribute("src") == "o.jpg" && tile5.getAttribute("src") == "o.jpg" && tile3.getAttribute("src") == "blank.jpg" ) {
		spotToFinish = 3;
		return true; //end positive slope diagonal
	} else {
		return false;
	}
}

function block() {
	document.getElementById("tile" + spotToBlock).setAttribute("src", "o.jpg");
}

function finishIt() {
	document.getElementById("tile" + spotToFinish).setAttribute("src", "o.jpg");
}

function checkForWinner() {
	if( tile1.getAttribute("src") == tile2.getAttribute("src") && tile2.getAttribute("src") == tile3.getAttribute("src") &&
		tile1.getAttribute("src") != "blank.jpg") {
		return true;
	}
	if( tile4.getAttribute("src") == tile5.getAttribute("src") && tile5.getAttribute("src") == tile6.getAttribute("src") &&
		tile4.getAttribute("src") != "blank.jpg") {
		return true;
	}
	if( tile7.getAttribute("src") == tile8.getAttribute("src") && tile8.getAttribute("src") == tile9.getAttribute("src") &&
		tile7.getAttribute("src") != "blank.jpg") {
		return true;
	}
	if( tile1.getAttribute("src") == tile4.getAttribute("src") && tile4.getAttribute("src") == tile7.getAttribute("src") &&
		tile1.getAttribute("src") != "blank.jpg") {
		return true;
	}
	if( tile2.getAttribute("src") == tile5.getAttribute("src") && tile5.getAttribute("src") == tile8.getAttribute("src") &&
		tile2.getAttribute("src") != "blank.jpg") {
		return true;
	}
	if( tile3.getAttribute("src") == tile6.getAttribute("src") && tile6.getAttribute("src") == tile9.getAttribute("src") &&
		tile3.getAttribute("src") != "blank.jpg") {
		return true;
	}
	if( tile1.getAttribute("src") == tile5.getAttribute("src") && tile5.getAttribute("src") == tile9.getAttribute("src") &&
		tile1.getAttribute("src") != "blank.jpg") {
		return true;
	}
	if( tile3.getAttribute("src") == tile5.getAttribute("src") && tile5.getAttribute("src") == tile7.getAttribute("src") &&
		tile3.getAttribute("src") != "blank.jpg") {
		return true;
	}
	if( availableTiles == 0) {
		outOfTiles = true; //This indicates that there is a tie
		return true;
	}
	//game has not ended
	return false;

}

function reset() {
	tile1.setAttribute("src","blank.jpg");
	tile2.setAttribute("src","blank.jpg");
	tile3.setAttribute("src","blank.jpg");
	tile4.setAttribute("src","blank.jpg");
	tile5.setAttribute("src","blank.jpg");
	tile6.setAttribute("src","blank.jpg");
	tile7.setAttribute("src","blank.jpg");
	tile8.setAttribute("src","blank.jpg");
	tile9.setAttribute("src","blank.jpg");
	document.getElementById("messages").innerHTML = "";
	gameOver = false;
	outOfTiles = false;
	availableTiles = 9;
}

function start() {
	tile1 = document.getElementById("tile1");
	tile1.addEventListener("click", toggleUserTile, false);
	tile2 = document.getElementById("tile2");
	tile2.addEventListener("click", toggleUserTile, false);
	tile3 = document.getElementById("tile3");
	tile3.addEventListener("click", toggleUserTile, false);
	tile4 = document.getElementById("tile4");
	tile4.addEventListener("click", toggleUserTile, false);
	tile5 = document.getElementById("tile5");
	tile5.addEventListener("click", toggleUserTile, false);
	tile6 = document.getElementById("tile6");
	tile6.addEventListener("click", toggleUserTile, false);
	tile7 = document.getElementById("tile7");
	tile7.addEventListener("click", toggleUserTile, false);
	tile8 = document.getElementById("tile8");
	tile8.addEventListener("click", toggleUserTile, false);
	tile9 = document.getElementById("tile9");
	tile9.addEventListener("click", toggleUserTile, false);
}



window.addEventListener("load", start, false);