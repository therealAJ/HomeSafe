 var map;

 var locations = [
      ['HUB 1 - Totem Park Residence @ Commonsblock', 49.25804, -123.25305, 1],
      ['HUB 2 - Marine Drive Residence @ Point Grill', 49.26173, -123.25516, 2],
      ['HUB 3 - Maple House Ponderosa @ Residence Lobby', 49.26343, -123.25571, 3],
      ['HUB 4 - Place Vanier Residence @ Commonsblock', 49.26473, -123.25867, 4],
      ['HUB 5 - 2700 Fairview Cres @ Bus Stop', 49.26242, -123.23909, 5],
      ['HUB 6 - Fairview Cres @ Beanery Coffee House', 49.26363, -123.23945, 6],
      ['HUB 7 - Acadia Park @ Commonsblock', 49.2627, -123.23737, 7],
      ['HUB 8 - Gage Residence @ Commonsblock', 49.2695, -123.24967, 8],
      ['HUB 9 - Green College @ Admin Building', 49.27117, -123.25651, 9],
      ['HUB 10  - St John\'s College', 49.26298, -123.25622, 10],
      ['HUB 11 - Ritsumeikan Residence', 49.26031, -123.2531, 11],
      ['HUB 12 - Thunderbird Residence @ Commonsblock', 49.25888, -123.24984, 12],
      ['HUB 13 - Koerner House @ Front Entrance', 49.26816, -123.25779, 13],
      ['HUB 14 - SUB @ North Entrance ', 49.2677, -123.25051, 14],
      ['HUB 15 - Electric Bus Loop @ #14 Bus Shelter', 49.2658, -123.24813, 15],
      ['HUB 16 - Bus Loop @ SRC Back Door', 49.26841, -123.24848, 16],
      ['HUB 17 - Fraser Hall @ Front Entrance ', 49.2615, -123.24083, 17],
      ['HUB 18 - Pan-Hellenic House @ Front Entrance', 49.26007, -123.23962, 18],
      ['HUB 19 - MBA House @ Front Entrance', 49.25394, -123.23497, 19],
      ['HUB 20 - Life Science @ Front Atrium', 49.2623, -123.24453, 20],
      ['HUB 21 - UBC Hospital', 49.26405, -123.24533, 21],
      ['HUB 22 - Forestry Bldg @ Agronomy Rd Entrance', 49.26057, -123.24884, 22],
      ['HUB 23 - UBC Bookstore @ Campus Security', 49.26496, -123.25017, 23],
      ['HUB 24 - Flag Pole Plaza @ Parking Shelter', 49.26892, -123.25615, 24],
      ['HUB 25 - Koerner Library @ Front Entrance', 49.26667, -123.25503, 25],
      ['HUB 26 - IKB Entrance', 49.26767, -123.25236, 26],
      ['HUB 27 - Allard Hall @ Front Entrance', 49.26944, -123.2533, 27],
      ['HUB 28 - VST @ Iona Drive', 49.27122, -123.25051, 28]
    ];


 var currentPositionLatLng;
 var endPositionLatLng;
 var endPosition;

 var directionsDisplay;

 var currentPosition;
 var currentPositionInfoWindow;
 


 function initMap() {

     map = new google.maps.Map(document.getElementById('map'), {
         center: {
             lat: 49.263,
             lng: -123.249
         },
         zoom: 15,
	 disableDefaultUI: true
     });

     // Get user location and place marker on map, open infowindow

     currentPosition = new google.maps.Marker({
         map: map
     });

     currentPositionInfoWindow = new google.maps.InfoWindow();

     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function (position) {
             var pos = {
                 lat: position.coords.latitude,
                 lng: position.coords.longitude
             };

             currentPosition.setPosition(pos);
             currentPosition.setTitle('Location found.');

             currentPositionInfoWindow.open(map, currentPosition);
             currentPositionInfoWindow.setContent("You are here");


             map.setCenter(pos);

             google.maps.event.addListener(currentPosition, 'click', (function (marker) {
                 return function () {
                     currentPositionInfoWindow.setContent("You are here");
                     currentPositionInfoWindow.setPosition(pos);
                     currentPositionInfoWindow.open(map, currentPosition);
                 }
             })(marker));

         }, function () {
             handleLocationError(true, currentPosition, map.getCenter());
         });
     } else {
         // Browser doesn't support Geolocation
         handleLocationError(false, currentPosition, map.getCenter());
     }

     // Create markers and infowindows of SafeWalk Locations 

     var infowindow = new google.maps.InfoWindow();
     var marker, i;
     

     for (i = 0; i < locations.length; i++) {
         marker = new google.maps.Marker({
             position: new google.maps.LatLng(locations[i][1], locations[i][2]),
             map: map
         });

         google.maps.event.addListener(marker, 'click', (function (marker, i) {
             return function () {
                 infowindow.setContent(locations[i][0]);
                 infowindow.open(map, marker);
             }
         })(marker, i));
     }

     var shortestPaths = [];
     var rankedLocations = locations;
     var ionaLatLong;

     navigator.geolocation.getCurrentPosition(function (p) {

         ionaLatLong = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);

         for (i = 0; i < locations.length; i++) {
             var latLngA = new google.maps.LatLng(locations[i][1], locations[i][2]);
             var distance = Math.round((google.maps.geometry.spherical.computeDistanceBetween(latLngA, ionaLatLong) / 1000) * 10) / 10;
             shortestPaths[i] = distance;
         }
         
         
         for (i = 0; i < locations.length; i++) {
          rankedLocations[i].distance = shortestPaths[i];
         }
         rankedLocations.sort(function(a, b) {
           return a.distance - b.distance;
         });

         var rows = 7,
             cols = 2;

         for (var i = 0; i < rows; i++) {
             $('table').append('<tr></tr>');
             for (var j = 0; j < cols; j++) {
                 $('table').find('tr').eq(i).append('<td></td>');
                 $('table').find('tr').eq(i).find('td').eq(j).attr('data-row', i).attr('data-col', j);
                 $('table').find('tr').eq(i).find('td').eq(0).text(rankedLocations[i][0]);
                 $('table').find('tr').eq(i).find('td').eq(1).text(rankedLocations[i].distance + " km away");
             }
         }

         // Create second drop down of locations
    
         var items = [];
         $.each(locations, function (i) {
            items.push('<li class="location-li"><a>' + rankedLocations[i][0] + '</a></li>');
         }); // close each()
         $('#dropdown2').append(items.join(''));
    
        //JS Event Handlers
        $('#dropdown2 > .location-li').on('touchend click mouseup', function(){ 
            event.stopPropagation();
            event.preventDefault();
            calculateLocation();
            
            var text = $(this).text();
            endPosition = text;
            $('#destination').text(endPosition);
        });

     });
 }

 function calculateLocation() {
     resetDirectionRender();
     
     if (navigator.geolocation) {
         google.maps.event.trigger(map, 'resize')
         navigator.geolocation.getCurrentPosition(function (position) {

         currentPositionLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

         console.log(currentPositionLatLng);
         
         currentPositionInfoWindow.open(map, currentPosition);
         currentPositionInfoWindow.setContent("You are here");

       for (var i = 0; i < locations.length; i++) {
           if (endPosition == locations[i][0]) {
  
               endPositionLatLng = new google.maps.LatLng(locations[i][1], locations[i][2]);
           }
       }
  
       var directionsService = new google.maps.DirectionsService();
  
       directionsDisplay = new google.maps.DirectionsRenderer();
       directionsDisplay.setMap(map);
       directionsDisplay.setPanel(document.getElementById("directionsPanel"));
       
       (function calcRoute() {
           var request = {
               origin: currentPositionLatLng,
               destination: endPositionLatLng,
               travelMode: google.maps.TravelMode.WALKING
           };
           directionsService.route(request, function (response, status) {
               if (status == google.maps.DirectionsStatus.OK) {
                   directionsDisplay.setDirections(response);
                   var totalDistance = computeTotalDistance(directionsDisplay.getDirections());
       		   var totalDuration = formatTime(computeTotalDuration(directionsDisplay.getDirections()));

       		   $('#directionsHeader').html("<div class='row'> <h5 class='col s12'>"+ totalDuration +" ("+ totalDistance + " km) </h5> <p class='col s9' id='endPosition'><span id='longDescription'>Click here for directions t/o</span> <span id='shortDescription'>Directions to</span> <b>" + endPosition + "</b> </p> <div class='col s3' id='walking-icon-wrapper'><img id='walking-icon-img' src='/img/walking-icon.png' style='width:inherit'></div> </div>");
		}
           });
       }());
 
     });
    }
 }

//Utility Functions

function formatTime(timeSeconds){
	var duration = moment.duration(1000*timeSeconds);
	var formattedString = "";
	if(duration.hours() == 1){
		formattedString += duration.hours() + " hour ";
	}else if(duration.hours() > 1){
		formattedString += duration.hours() + " hours ";
	}
	
	if(duration.minutes()){
		formattedString += duration.minutes() + " min ";
		
		if(!duration.hours()){
			formattedString += duration.seconds() + " sec";
		}
	}
	
	return formattedString;
}

function computeTotalDistance(result) {
  var total = 0;
  console.log(result)
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000;
  return total;
}

function computeTotalDuration(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].duration.value;
  }
  return total;
}

 function resetDirectionRender() {
     $(directionsPanel).empty();
     if(directionsDisplay) directionsDisplay.setMap(null);
     $('#directions-below').empty();
 }
