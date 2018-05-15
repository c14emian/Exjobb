function changePage(newPage){
	switch(newPage){
		case "search":
			$("#insertPage").hide();
			$("#searchPage").show();
			document.getElementById("pageInfo").innerHTML="Search the database";
			break;
		case "insert":
			$("#searchPage").hide();
			$("#insertPage").show();
			document.getElementById("pageInfo").innerHTML="Insert data";
			break;
	}
}