YelpClone.Views.Map = Backbone.View.extend({
  mapTemplate : JST['search/map'],

  createMap: function (){
     YelpClone.map = L.mapbox.map('map-show', 'examples.map-i86l3621')

     YelpClone.map.setView([40.735031, -73.990517], 13);
    YelpClone.map.featureLayer.on('click', function(e) {
      YelpClone.map.panTo(e.layer.getLatLng());
    });
  },

  render: function () {
    YelpClone.router.map = this;
    return this;
  },

  addPins: function () {

  }

})
