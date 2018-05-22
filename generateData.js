// Clear databases and textfiles
function prepareInsert(){
	var loop = 0;
	$.ajax({
		type: "POST",
		url: "resetDB.php",
		cache: false,
		data: {
			dbType: db,
			searches: $("#dataAmount").val(),
			storeType: "insert"
		},
		success: function(data){
			console.log(data);
			generateData(loop);
		},
		error: function(exception){
			console.log(exception.responseText);
		}
	})
}

// Function to generate data
function generateData(){
	var counter = 0;
	var id = 0;
	var dives = [];
	var allDives = [];

	// Interval loops until close with 700ms delay
	var loop = setInterval(function () {
		id++;

		allDives = randomValues();	// Generate diveLog data

		// Generate sightings
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

		insertData(allDives, sights); 

		console.log(counter);
		counter++;
		if(counter > 99){ clearInterval(loop);}

	}, 700)
}

// Function for calling PHP-Insertion
function insertData(dives, sightings){
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

// Function for storing time
function storeTime(searchTime){
	$.ajax({
		type: "POST",
		url: "writeTime.php",
		cache: false,
		data: {
			storeTime: searchTime,
			dbType: db,
			searches: $("#dataAmount").val(),
			storeType: "insert"
		},
		success: function(data){
			console.log("Search time: " + data + "ms stored.");
		},
		error: function(exception){
			console.log(exception.responseText);
		}
	})
}

// Functions for generating data

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
