/*in order to try and get things working I talked with Sophie Price. She gave me some good tips and showed me her git hub in order to help. The below is 99.9% her code. I tryed to tweek it in different versions to make it work for me but I couldnt get it working.  */

var city;
/* -------------- GEOLOCATION ------------ */
//Google Map Key: AIzaSyDZ7402uvsGRTOP_pqKkRm3fjWXbeIJ7pg        
// Try HTML5 geolocation.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var geocoder = new google.maps.Geocoder;
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    geocoder.geocode({'latLng': pos}, function (locations, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        for (var location of locations) {
          if ($.inArray('locality', location.types) != -1) {
            document.getElementById("locDisp").innerHTML = location.formatted_address;
            city = location.address_components[2].short_name; //Getting the current city
            city = city.replace(/\s+/g, '-').toLowerCase(); //making lowercase and any spaces change to - so that it will not break URL and cities like New Plymouth become new-plymouth which works with the URL.
              
            /* -------------- WEATHER ------------ */
           // this proxy from Sam Jones, who I also spoke to, is how the JSON is being able to be fetched. I had both him and Sophie help but still couldnt get it working.  
            var metServ = "http://uni.ey.nz/metservice.php?oneMinObs_";
            var jsonURL = metServ + wellington;
            $.getJSON(jsonURL, function (json) {
             var weatherForecast = json.temperature;
             document.getElementById("weatherDisp").innerHTML = 'Temperature : ' + weatherForecast;
            });
            break;
          }
        }
      }
   });
  });
}