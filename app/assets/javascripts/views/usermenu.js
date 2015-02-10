YelpClone.Views.UserMenu = Backbone.View.extend({

  tagName: 'section',
  template: JST['users/menu'],


  initialize: function (options){
    this.model = options.user;
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },

});
