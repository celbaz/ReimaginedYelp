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
    'submit': 'runSearch',
    'submit .nearme': 'locates',
    'click .list-place': 'createQuickView',
    'dblclick .list-place': 'fullRestView',
  },

  createQuickView: function (event) {
    var id = $(event.target).attr("data-id");
    var model = YelpClone.places.getOrFetch(id);

    // inject content and then
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

  fullRestView: function (event) {
    var id = $(event.target).attr("data-id");
    var model = YelpClone.places.getOrFetch(id);
    var renderedContent = this.restaurantTemplate({
      restaurant : model
    });
    $('#map-show').html(renderedContent);
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
    }); //add to collection once fetched
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
          // address: place.escape("description"),
          id: place.id,
          cuisine: place.escape("cuisine"),
          // photo_url: location.escape("photo_url"),
          // price: location.escape("price"),
          'marker-size': 'large',
          'marker-color': '#e67e22',
          'marker-symbol': 'restaurant'
        }
      });
      // var marker = new L.marker([place.get("latitude"),
      // place.get("longitude")], {
      //   icon: L.mapbox.marker.icon({
      //     'marker-size': 'large',
      //     'marker-symbol': 'restaurant',
      //     'marker-color': '#e67e22'
      //   })}
      // ).addTo(YelpClone.map).bindPopup(place.get("name"));
    });
    // var renderedContent = this.resultTemplate({
    //   places: this.restaurants
    // });
    featureLayer.setGeoJSON(geoJSON);

    featureLayer.eachLayer( function (layer) {
    var $ul = $("#results-are-nice");
    // $ul.addClass("group");
    var $li = $('<li>');
    $li.html(layer.feature.properties.title);
    $li.addClass("list-place");
    // var $a =  $('<a>');
    // var $img = $('<img>');
    // $img.attr("src", layer.feature.properties.photo_url);
    // $a.attr("href", "#/locations/" + layer.feature.properties.id);
    // $a.attr("class", "listing");
    // $a.html($img);
    //
    // var $div = $('<div>');
    // $div.attr("class", "listing-info");
    //
    // var $h4 = $('<h4>');
    // var $h5 = $('<h5>');
    // $h4.html(layer.feature.properties.title);
    // $h5.html("$" + layer.feature.properties.price);
    // $div.append($h4);
    //
    // $li.html($a);
    // $li.append($h5);
    // $li.append($div);
    $li.on("mouseenter", function(event) {
      // console.log(layer.feature.properties['marker-color'])
      YelpClone.map.panTo(layer.getLatLng());
      // layer.feature.properties['marker-color'] = "#ccc";
      // layer.addTo(YelpClone.map);
    })
    $ul.append($li);
  });

  YelpClone.map.fitBounds(featureLayer.getBounds());
}
  //   this.currentLayer = featureLayer;
  // //   $("#results-are-nice").html(renderedContent);
  // // }
});
