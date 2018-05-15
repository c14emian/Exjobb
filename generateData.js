var dives = [];
var id = 0;
var allDives = [];
var allSights = [];
var db = "";
var activeURL = "";
var loop = 0;
var numOfData = 100;
$(document).ready(function() {

	// Set mysql as standard database
  db = 'mysql';
  activeURL = 'insertMySQL.php';

  // Function for changing database
  $("#switchDB").click(function(){
    if(db == 'mysql'){
      db = 'mongodb';
      activeURL = 'insertMongo.php';
      console.log(db);
    }
    else if(db == 'mongodb'){
      db = 'mysql';
      activeURL = 'insertMySQL.php';
      console.log(db);
    }
    alert('changed database to ' + db + '!');
  });

		

		function createTable(myArray) {
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
		}

		$("#generateButton").click(function() {
			console.log("HEJ");
			generateData();
		});

		

});
function generateData(){
if(loop > numOfData){loop = 0;}
setTimeout(function () {
				id++;
				allDives = randomValues();

				var sightings = [];
				var numOfSightings = Math.floor((Math.random() * 4) + 4)
				for(var i = 0; i<numOfSightings; i++){
					var newSighting = randomSighting();
					if(sightings.includes(newSighting)){
						i--;
					}
					else{
						sightings.push(newSighting);
					}
					
				}
				var sights = [id, sightings];
				//allSights.push($sights);
				insertMySQL(allDives, sights);

				console.log(loop);
				loop++;
				if(loop < numOfData){
					generateData();
				}
			}, 500)
}

function storeTime(insertTime){
  $.ajax({
    type: "POST",
    url: "writeInsertTime.php",
    cache: false,
    data: {
      insertTime: insertTime,
      dbType: db,
      test: numOfData
    },
    success: function(data){
      console.log("Insert time: " + data + "ms stored.");
    },
    error: function(exception){
      console.log(exception.responseText);
    }
  })
}

function randomDate(start, end) {
 			var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    		month = '' + (d.getMonth() + 1),
        	day = '' + d.getDate(),
        	year = d.getFullYear();

    		if (month.length < 2) month = '0' + month;
    		if (day.length < 2) day = '0' + day;

   		 	return [year, month, day].join('-');
		}

		function randomLocation(){
			var Locations = 
			[
			"Phuket",
			"Oslo",
			"Miami",
			"Phi Phi Islands",
			"Kairo"
			];
			var rand = Locations[Math.floor(Math.random() * Locations.length)];
			return rand;
		}

		function randomSighting(){
			var Animal = 
			[
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
			var rand = Animal[Math.floor(Math.random() * Animal.length)];
			return rand;
		}

		function randomValues(){
			
			var date = randomDate(new Date(2000, 0, 1), new Date());
			var diveLocation = randomLocation();
			var depth = Math.floor((Math.random() * 16) + 15);
			var diveTime = Math.floor((Math.random() * 31) + 30);

			var pressStart = Math.floor((Math.random() * 31) + 170);
			var pressEnd = Math.floor((Math.random() * 61) + 15);

			dives = [date, diveLocation, depth, diveTime, pressStart, pressEnd];
			return (dives);
		}

function insertMySQL(dives, sightings){

			var startTime = (new Date).getTime();

			JSON.stringify(dives);
			$.ajax({
				type: "POST",
				url: activeURL,
				cache: false,
				data: {
					diveData : dives,
					sightData: sightings},
				success: function(data){
					var diffTime = (new Date).getTime() - startTime;
        			storeTime(diffTime);
				},
				error: function(exception){
      				console.log(exception.responseText);
    			}
			})
		}