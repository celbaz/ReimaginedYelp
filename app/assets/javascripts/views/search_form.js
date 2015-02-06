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
    if ( YelpClone.sentenceQuery !== "") {
      console.log(YelpClone.sentenceQuery);
      this.runSentenceSearch();
    }
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
        restaurant : model,
        reviews : model.get("reviews")
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
    event.preventDefault();

    // removes pins from last search
    if(this.currentLayer){
      YelpClone.map.removeLayer(this.currentLayer);
    }

    var formData = $("#search-form").serializeJSON().place;
    if ( formData.location === "" ) {
      formData.location = YelpClone.CurrentLocation;
    }
    formData.kind = "search";
    this.restaurants.fetch({
      data: formData
    });
  },

  runSentenceSearch: function() {
    var query = YelpClone.sentenceQuery;
    YelpClone.sentenceQuery = "";

    if ( query.location === "" ) {
      query.location = "Mannhattan, NY";
    }
    query.kind = "sentence";
    // make a seperate search function in rails
    this.restaurants.fetch({
      data: query
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
    var $ul = $(".list-o-results");
    $ul.html("");

    featureLayer.eachLayer( function (layer) {

      var $li = $('<li>');
      $li.html(layer.feature.properties.title);
      $li.addClass("list-place");
      $li.attr('data-id', layer.feature.properties.id);

      $li.on("mouseenter", function(event) {
        YelpClone.map.panTo(layer.getLatLng());
        // event.featureLayer.feature.properties['marker-color'] = '#ff8888';
      })
      $ul.append($li);
  });

  this.currentLayer = featureLayer;
  YelpClone.map.fitBounds(featureLayer.getBounds());
},

});
