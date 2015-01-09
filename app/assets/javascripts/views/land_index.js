YelpClone.Views.MainPageView = Backbone.View.extend({
  template: JST["landing/index"],

  render: function () {
    var renderedContent = this.template();
    console.log(renderedContent);
    this.$el.html(renderedContent);
    return this;
  }
});
