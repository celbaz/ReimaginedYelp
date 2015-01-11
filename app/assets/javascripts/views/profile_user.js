YelpClone.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],
  userProfileTemplate: JST['user/profile'],

  initialize: function (){
    this.listenTo(this.model, 'sync', this.render)
  },

  render: function () {
    var renderedContent = this.template({
        user : this.model
    });
    this.$el.html(renderedContent);
    return this;
  }
});
