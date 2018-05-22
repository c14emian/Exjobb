// ==UserScript==
// @name     Exjobb Search
// @version  1
// @grant    all
// @include http://localhost/Exjobb/*
// @require http://code.jquery.com/jquery-2.1.0.min.js
// ==/UserScript==
$(document).ready(function(){


    console.log("Search is ready");

    $("#searchButton").click(function(){
        var counter = 0;
        runSearch(counter);
    });
});

function runSearch(counter){
    var searchArray = [
			"Barracuda",
			"Manta Ray",
			"Leopard Shark",
			"Moray Eel",
			"Clownfish",
			"Black Tip Reef Shark",
			"Leopard Shark",
			"Parrot Fish",
			"Eagle Ray",
			"Dolphin",
			"Tuna"
			];
    if(counter < 20){
        setTimeout(function(){
            var rand = searchArray[Math.floor(Math.random() * searchArray.length)];
            console.log(rand);
            $("#searchField").val(rand);
            $("#ajaxButton").click();
            counter = counter + 1;
            console.log("Counter = " + counter);
            runSearch(counter);
        }, 500);
    }
    else{
        console.log("Finished searching");
    }
}

