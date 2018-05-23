function prepareSearch(){
  clearFile();
  var counter = 0;
  getSearchValue(counter);
}

function getSearchValue(counter){
  if(searchType == 'sight'){
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
  }
  else if(searchType == 'location'){
    var searchArray = [
    "Phuket",
    "Oslo",
    "Miami",
    "Phi Phi Islands",
    "Kairo"
    ];
  }
  else{console.log('Searchtype not defines!');}



  if(counter < 100){
    setTimeout(function(){
      var searchValue = searchArray[Math.floor(Math.random() * searchArray.length)];
      searchData(searchValue);
      counter++;;
      console.log("Counter = " + counter);
      getSearchValue(counter);
    }, 500);
  }
  else{
    console.log("Finished searching");
  }
}

function searchData(value){
  var startTime = (new Date).getTime();
  $.ajax({
    type: "POST",
    url: activeURL,
    data: {
      searchData : value,
      searchType : searchType
    },
    dataType: "json",
    success: function(data) {
      var obj = data;      
      var result = "<ul>"
      if(obj.length>0){
        $.each(obj, function() {
          if(db == "mysql"){
            if(this['id'] != null){
              result += "<li>Id : " + this['id'] + ", Date: " + this['diveDate'] + 
              ", Location: " + this['Location'] + ", Depth: " + this['Depth'] + 
              ", Dive Time: " + this['diveTime'] + ", Pressure Start: " 
              + this['pressureStart'] + ", Pressure End: " + this['pressureEnd'] + "</li>";
            }
            else if(this['diveID'] != null){
              result += "<li>Sight : " + this['sight'] + "</li>";
            }
          }
          else if(db == "mongodb"){
            result += "<li> Date: " + this['diveDate'] + 
            ", Location: " + this['Location'] + ", Depth: " + this['Depth'] + 
            ", Dive Time: " + this['diveTime'] + ", Pressure Start: " 
            + this['pressureStart'] + ", Pressure End: " + this['pressureEnd'] + 
            ", Sightings: " + this['Sightings'] + "</li>" ;
          }

        });     
      }
      else{
        result += "Location not found!";
      }
      $("#result").html(result);

      var diffTime = (new Date).getTime() - startTime;
      storeTime(diffTime);
    },
    error: function(exception){
     console.log("ERROR " + exception.responseText);
   }
 }); 
}

function storeTime(searchTime){
  $.ajax({
    type: "POST",
    url: "writeTime.php",
    cache: false,
    data: {
      storeTime: searchTime,
      dbType: db,
      searches: $("#dataAmount").val(),
      storeType: "search-" + searchType
    },
    success: function(data){
      console.log("Search time: " + data + "ms stored.");
    },
    error: function(exception){
      console.log(exception.responseText);
    }
  })
}

function clearFile(){
  $.ajax({
    type: "POST",
    url: "clearFile.php",
    cache: false,
    data: {
      dbType: db,
      searches: $("#dataAmount").val(),
      storeType: "search-" + searchType
    },
    success: function(data){
      console.log("File cleared!");
    },
    error: function(exception){
      console.log(exception.responseText);
    }
  })
}