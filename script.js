function addRow(){
				
			
			//$('#input_row').append('<input type="text" id="name" placeholder="Name">');	
			$('#input_row').append('<input type="text" id="street" placeholder="Street">');	
			$('#input_row').append('<input type="text" id="city" placeholder="City">');
			$('#input_row').append('<input type="text" id="state" placeholder="State">');
			$('#input_row').append('<input type="text" id="zip" placeholder="Zip Code">');						
			
			/*
			//$('#input_row').append('<input type="text" id="name" value="Name">');	
			$('#input_row').append('<input type="text" id="street" value="131 Riverlawn Ave">');	
			$('#input_row').append('<input type="text" id="city" value="Watertown">');
			$('#input_row').append('<input type="text" id="state" value="WI">');
			$('#input_row').append('<input type="text" id="zip" value="53094">');	
				*/	
}

function createMap(){
	map = L.map('map').setView([39.5,-98.35],5);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
	
}

function geocodeAddress(){
	name = $("#name").val();
	street = $("#street").val();
	city = $("#city").val();
	state = $("#state").val();
	zip = $("#zip").val();

	var plus_street= street.replace(/ /gi,"+");
    var plus_city = city.replace(/ /gi, "+");
    var plus_state = state.replace(/ /gi,"+");
    var plus_zip = zip.replace(/ /gi, "+");		

	//example format to pass to geocoder - http://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=4600+Silver+Hill+Rd%2C+Suitland%2C+MD+20746&benchmark=9&format=json
	var urlString = "http://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=" + plus_street + "%2C+" + plus_city + "%2C+" + plus_zip + "&benchmark=9&format=jsonp";

	$.ajax({
		type: "GET",
		dataType: "jsonp",
		contentType: "application/json",
		url: urlString,
		success: function(data) {
			mineJSON(data);
		},
		error: function(xhr, ajaxOptions, thrownError) {
			console.log(xhr.status, thrownError);
		}
	});
}

function mineJSON(json){

	try{
		x = json.result.addressMatches[0].coordinates.x;
		y =	json.result.addressMatches[0].coordinates.y;			

		//console.log(x,y);
		completeAddress = street + " " + city + " " + state + " " + zip;
		popupContent = "<center>" + completeAddress + "<p>" + y + ", " + x + "</p></center>";

		L.marker([y, x]).addTo(map).bindPopup(popupContent);
		map.setZoom(12);
		map.setView(new L.LatLng(y,x));

		$("xy").append(y);
		appendCSV(name, street, city, state, zip, x,y);		
		
		var blah = completeAddress + ", " + x + ", " + y;
		entries[entryCount] = blah;
		 
	}
	catch(err){
		$('#map').append('<div id="geocodeError">Whoops! We were unable to geocode that address, sorry about that!<p><input type="button" id="geocodeErrorDismiss" value="Dismiss"></p></div>');
		$('#geocodeErrorDismiss').click(function(){
			$('#geocodeError').remove();
		});
		//alert("Unable to geocode address: " + street + " " + city + " " + state + " " + zip);
	}		
}

function appendCSV(name, street, city, state, zip, x, y){
	if (entryCount == 1){
		$('#bottomContent').append('<div id="csv"><h2>CSV</h2></div>');
		$('#bottomContent').append('<div id="json"><h2>JSON</h2></div>');
		$('#csv').append("ID, Street, City, State, Zip, X, Y<br />");
		//$('#json').append("Coming Soon!");
	}
	var csvString = entryCount + ", " + street + ", " + city + ", " + state + ", " + zip + ", " + x + ", " + y +"<br />";
	$('#csv').append(csvString);	
	
	appendJSON(x,y);
	entryCount += 1;	
}

function appendJSON(x,y){	
	
	var newJSONFeature = '{"type":"Feature","geometry":{"type":"Point","coordinates":[' + x + ', ' + y + '],"properties":{"address":"'+ completeAddress + '"}}';	
	geojsonBuilder = geojsonBuilder + newJSONFeature;
	var finalJSON = geojsonBuilder + '}';
	$('#json').empty();
	$('#json').append("<h2>JSON</h2>");
	$('#json').append(finalJSON);
	
}