 var map;

 function initMap() {
     map = new google.maps.Map(document.getElementById('map'), {
         center: {
             lat: 49.263,
             lng: -123.249
         },
         zoom: 15
     });

     // Get user location and place marker on map, open infowindow

     var currentPosition = new google.maps.Marker({
         map: map,
     });
     var currentPositionInfoWindow = new google.maps.InfoWindow();

     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function (position) {
             var pos = {
                 lat: position.coords.latitude,
                 lng: position.coords.longitude
             };

             currentPosition.setPosition(pos);
             currentPosition.setTitle('Location found.');
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



     var locations = [
      ['Safe Walk via UBC Village', 49.266316, -123.24361, 1],
      ['Safe Walk via Walter Gage Residence', 49.27, -123.25, 2],
      ['Safe Walk via Irving Library', 49.267581, -123.252321, 3],
      ['Safe Walk via Save On Foods', 49.254, -123.24, 4],
      ['Safe Walk via Wreck Beach', 49.262, -123.2581, 5],
      ['Safe Walk via Thunderbird Stadium', 49.2554, -123.246, 6],
      ['Safe Walk via Museum of Anthropology', 49.2683, -123.259095, 7]
    ];

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


     var shortestPaths = []
     var ionaLatLong = new google.maps.LatLng(49.2704778, -123.2525351);
     
     // TODO: Figure out how to get current position's LatLng into global var
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(function (position) {
//             var pos = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude
//             };
//
//             ionaLatLong = pos;
//
//         }, function () {
//             handleLocationError(true, currentPosition, map.getCenter());
//         });
//     } else {
//         // Browser doesn't support Geolocation
//         handleLocationError(false, currentPosition, map.getCenter());
//     }


     for (i = 0; i < locations.length; i++) {
         var latLngA = new google.maps.LatLng(locations[i][1], locations[i][2]);
         var distance = Math.round((google.maps.geometry.spherical.computeDistanceBetween(latLngA, ionaLatLong) / 1000) * 100) / 100;

         shortestPaths[i] = distance;
     }

     var rows = 7,
         cols = 2;

     for (var i = 0; i < rows; i++) {
         $('table').append('<tr></tr>');
         for (var j = 0; j < cols; j++) {
             $('table').find('tr').eq(i).append('<td></td>');
             $('table').find('tr').eq(i).find('td').eq(j).attr('data-row', i).attr('data-col', j);
             $('table').find('tr').eq(i).find('td').eq(0).text(locations[i][0]);
             $('table').find('tr').eq(i).find('td').eq(1).text(shortestPaths[i] + " km");
             //locations[i][1]
         }
     }

 }