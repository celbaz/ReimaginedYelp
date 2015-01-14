window.YelpClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // Initializing Map
    L.mapbox.accessToken = YelpClone.MapboxToken;
    YelpClone.map  = new L.mapbox.map('map', 'examples.map-i86l3621');

    YelpClone.map.on('locationfound', function (e) {
      YelpClone.CurrentLocation.latitude = e.latlng.lat;
      YelpClone.CurrentLocation.longitude = e.latlng.lng;
    });
    YelpClone.map.on('locationerror', function (e) {
      if(YelpClone.CurrentLocation.latitude === 0 || YelpClone.CurrentLocation.longitude === 0) {
        YelpClone.CurrentLocation = {latitude: 40.735031, longitude: -73.990517};
      }
    });
    YelpClone.map.locate();
    YelpClone.places = new YelpClone.Collections.Restaurants();
    new YelpClone.Routers.Router({ $rootEl : $("#content") });
    Backbone.history.start();
  }
};
