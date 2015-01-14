YelpClone.Views.Search = Backbone.View.extend({

  initialize: function () {
    th
  },

  template: JST['search/index'],

  render: function () {
    var renderedContent = this.template();
    // console.log("hello");
    this.$el.html(renderedContent);
    return this;
  },

  renderMap: function () {
  }

});
