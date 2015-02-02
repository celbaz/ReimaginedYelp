YelpClone.Views.SearchForm = Backbone.View.extend({

  template: JST['search/form'],
  resultTemplate: JST['search/results'],
  showTemplate: JST['search/show'],
  quickViewTemplate: JST['search/quickview'],
  restaurantTemplate: JST['restaurants/show'],

  initialize: function () {
    this.restaurants = new YelpClone.Collections.Restaurants();
    this.restaurants.url = "api/restaurants/search";
    this.listenTo(this.restaurants, 'sync', this.renderResults);
  },

  events: {
    'submit #search-form': 'runSearch',
    'click .list-place': 'createQuickView',
    // 'hover .list-place': 'switchQuickView'
  },

  createQuickView: function (event) {
    var id = $(event.target).attr("data-id");
    var model = this.restaurants.get(id);

    var quickview = $('.cd-panel');
    var renderedContent = this.quickViewTemplate({
        restaurant : model
    });

    if(quickview.hasClass("is-visible")) {
      $(".cd-panel-content").html(renderedContent);
    } else {
      $(".cd-panel-content").html(renderedContent);
      quickview.addClass('is-visible');
    }
  },

  // switchQuickView: function (event) {
  //   var id = $(event.target).attr("data-id");
  //   var model = this.restaurants.get(id);
  //   console.log("Helloi");
  //   // inject content and then
  //   var renderedContent = this.quickViewTemplate({
  //       restaurant : model
  //   });
  //   $(".cd-panel-content").html(renderedContent);
  // },



  render: function () {
    var renderedContent = this.template({});
    this.$el.html(renderedContent);
    return this;
  },

  runSearch: function (event) {

    // removes pins from last search
    if(this.currentLayer){
      YelpClone.map.removeLayer(this.currentLayer);
    }
    event.preventDefault();
    var formData = $("#search-form").serializeJSON().place;

    if ( formData.location === "" ) {
      formData.location = YelpClone.CurrentLocation;
    }

    this.restaurants.fetch({
      data: formData
    });
  },

  renderResults: function() {
    var featureLayer = L.mapbox.featureLayer().addTo(YelpClone.map);
    var geoJSON = {
      type: "FeatureCollection",
      features: []
    };

    this.restaurants.each(function (place) {
      geoJSON.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
          place.escape("longitude"),
          place.escape("latitude")
          ]
        },
        properties: {
          title: place.escape("name"),
          id: place.id,
          cuisine: place.escape("cuisine"),
          'marker-size': 'large',
          'marker-color': '#e67e22',
          'marker-symbol': 'restaurant'
        }
      });
    });

    featureLayer.setGeoJSON(geoJSON);
    var $ul = $("#results-are-nice");
    $ul.html("");

    featureLayer.eachLayer( function (layer) {

      var $li = $('<li>');
      $li.html(layer.feature.properties.title);
      $li.addClass("list-place");
      $li.attr('data-id', layer.feature.properties.id);

      $li.on("mouseenter", function(event) {
        YelpClone.map.panTo(layer.getLatLng());
      })
      $ul.append($li);
  });

  this.currentLayer = featureLayer;
  YelpClone.map.fitBounds(featureLayer.getBounds());
},

});
