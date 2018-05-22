var db = "";
var activeURL = "";
var searchType ='';
$(document).ready(function() {

	// Set mysql as standard database
	db = 'mysql';
	activeURL = 'MySQL.php';

  // Function for changing database
  $("#switchDB").click(function(){
  	if(db == 'mysql'){
  		db = 'mongodb';
  		console.log(db);
  	}
  	else if(db == 'mongodb'){
  		db = 'mysql';
  		console.log(db);
  	}
  	alert('changed database to ' + db + '!');
  });

  $("#generateButton").click(function() {
    if(db == 'mysql'){
      activeURL = 'insertMySQL.php';
    }
    else if(db == mongodb){
      activeURL = 'insertMongo.php';
    }
  	prepareInsert();
  });

  // Functions for fetching data
  $("#animalSearch").click(function() {
    if(db == 'mysql'){
      activeURL = 'fetchMySQL.php';
    }
    else if(db == mongodb){
      activeURL = 'fetchMongo.php';
    }
    searchType = 'sight';
    prepareSearch();
  });

  $("#diveSearch").click(function() {
    if(db == 'mysql'){
      activeURL = 'fetchMySQL.php';
    }
    else if(db == mongodb){
      activeURL = 'fetchMongo.php';
    }
    searchType = 'location';
    prepareSearch();
  });
  /*function createTable(myArray) {
  	var table = document.getElementById("diveTable").getElementsByTagName('tbody')[0];
  	var array = myArray;
  	for (var i = 0; i < array.length; i++){
  		var row = table.insertRow(i);
  		var numValues = Object.keys(array[i]).length;
  		var cells = [];
  		for(var j = 0; j < numValues; j++){
  			var value = Object.keys(array[i])[j];
  			cells[j] = row.insertCell(j);
  			cells[j].innerHTML = array[i][value];
  		}
  	}
  }*/

});