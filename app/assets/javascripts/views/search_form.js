YelpClone.Views.SearchForm = Backbone.View.extend({

  template: JST['search/form'],

  events: {
    'submit': 'runSearch',
    'submit .nearme': 'locates'
  },

  render: function () {
    var renderedContent = this.template({});
    this.$el.html(renderedContent);
    return this;
  },

  runSearch: function () {




  },


  locates: function () {
    YelpClone.map.on('locationfound', function (e) {
      YelpClone.CurrentLocation.latitude = e.latlng.lat;
      YelpClone.CurrentLocation.longitude = e.latlng.lng;
      console.log(e.latLng);
    });
    YelpClone.map.on('locationerror', function (e) {
      if(YelpClone.CurrentLocation.latitude === 0 || YelpClone.CurrentLocation.longitude === 0) {
        YelpClone.CurrentLocation = {latitude: 40.735031, longitude: -73.990517};
      }
    });
    YelpClone.map.locate();
  },

  addPins: function (collection) {
    var featureLayer = L.mapbox.featureLayer().addTo(YelpClone.map);
    collection.each()
  }

});
