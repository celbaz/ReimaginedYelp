YelpClone.Views.Map = Backbone.View.extend({
  mapTemplate : JST['search/map'],

  createMap: function (){
     YelpClone.map = L.mapbox.map('map-show', 'examples.map-i86l3621')

     YelpClone.map.setView([40.735031, -73.990517], 13);
    YelpClone.map.featureLayer.on('click', function(e) {
      YelpClone.map.panTo(e.layer.getLatLng());
    });
  },

  locates: function () {
    YelpClone.map.on('locationfound', function (e) {
      YelpClone.CurrentLocation = {latitude: e.latlng.lat, longitude: e.latlng.lng};
    });
    YelpClone.map.on('locationerror', function (e) {
      if(YelpClone.CurrentLocation.latitude === 0 || YelpClone.CurrentLocation.longitude === 0) {
        YelpClone.CurrentLocation = {latitude: 40.735031, longitude: -73.990517};
      }
    });
    YelpClone.map.locate();
  },
  render: function () {
    YelpClone.router.map = this;
    return this;
  },

  addPins: function () {

  }

})
