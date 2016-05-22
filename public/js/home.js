 var map;

 function initMap() {
     map = new google.maps.Map(document.getElementById('map'), {
         center: {
             lat: 49.265,
             lng: -123.245
         },
         zoom: 15
     });
 }