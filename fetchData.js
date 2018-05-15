$(document).ready(function() {

  // Set mysql as standard database
  var db = 'mysql';
  var activeURL = 'fetchMySQL.php';

  // Function for changing database
  $("#switchDB").click(function(){
    if(db == 'mysql'){
      db = 'mongodb';
      activeURL = 'fetchMongo.php';
    }
    else if(db == 'mongodb'){
      db = 'mysql';
      activeURL = 'fetchMySQL.php';
    }
    alert('changed database to ' + db + '!');
  });

  // Function for fetching data
  $("#ajaxButton").click(function() {

    var startTime = (new Date).getTime();

    $.ajax({
      type: "POST",
      url: activeURL,
      data: {searchData : $("#searchField").val()},
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
  });

function storeTime(searchTime){
  $.ajax({
    type: "POST",
    url: "writeSearchTime.php",
    cache: false,
    data: {
      storeTime: searchTime,
      dbType: db
    },
    success: function(data){
      console.log("Search time: " + data + "ms stored.");
    },
    error: function(exception){
      console.log(exception.responseText);
    }
  })
}

});

