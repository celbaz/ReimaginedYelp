YelpClone.Views.SearchForm = Backbone.View.extend({

  template: JST['search/form'],
  resultTemplate: JST['search/results'],

  initialize: function () {
    this.restaurants = new YelpClone.Collections.Restaurants();
    this.restaurants.url = "api/restaurants/search";
    this.listenTo(this.restaurants, 'sync', this.renderResults);
  },

  events: {
    'submit': 'runSearch',
    'submit .nearme': 'locates'
  },

  render: function () {
    var renderedContent = this.template({});
    this.$el.html(renderedContent);
    return this;
  },

  runSearch: function (event) {
    if(this.currentLayer){
      this.currentLayer.removeLayer(YelpClone.map);
    }
    event.preventDefault();
    var formData = $("#search-form").serializeJSON().place;
    if (formData.location === ""){
      formData.location = YelpClone.CurrentLocation;
    }
    this.restaurants.fetch({
      data: formData
    });
  },

  renderResults: function() {
    console.log(this.restaurants);
    var featureLayer = L.mapbox.featureLayer().addTo(YelpClone.map);
    this.restaurants.each(function (place) {
      var marker = new L.marker([place.get("latitude"),
      place.get("longitude")], {
        icon: L.mapbox.marker.icon({
          'marker-size': 'large',
          'marker-symbol': 'restaurant',
          'marker-color': '#e67e22'
        })}
        ).addTo(YelpClone.map);
    });
    this.currentLayer = featureLayer;
    var renderedContent = this.resultTemplate({
      places: this.restaurants
    });
    $("#results-are-nice").html(renderedContent);
  }
});
