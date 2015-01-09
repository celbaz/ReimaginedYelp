YelpClone.Views.RestaurantIndex = Backbone.View.extend({
  template: JST['restaurants/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var renderedContent  = this.template({
      places: this.collection
    });
    this.$el.html(renderedContent);
    return this;
  },

});
