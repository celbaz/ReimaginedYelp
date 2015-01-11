YelpClone.Views.MainPageView = Backbone.View.extend({
  template: JST["landing/index"],
  tagName: "form",
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },

  events: {
    'click .submit-sign': 'LogUser'
  },

  LogUser: function (event) {
    event.preventDefault();
    console.log("hello");
  }


});
