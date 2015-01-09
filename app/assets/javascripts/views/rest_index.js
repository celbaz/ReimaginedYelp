YelpClone.Views.RestaurantIndex = Backbone.View.extend({
  template: JST['restaurants/index'],

  placeTemplate: JST['restaurants/show'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  events:{
    'click li': 'renderModel'
  },

  render: function () {
    var renderedContent  = this.template({
      places: this.collection
    });
    this.$el.html(renderedContent);
    return this;
  },

  renderModel: function (event) {
    var id = $(event.target).attr("data-id");
    var restaurant = YelpClone.places.get(id);
    var renderedContent =  this.placeTemplate({
        place : restaurant
    });

    $("#restaurant-view").html(renderedContent);
  }

});
