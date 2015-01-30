YelpClone.Views.SentenceIndex = Backbone.View.extend({
  template: JST['sentence/index'],

  initialize: function () {
    // this.listenTo(this.collection, 'sync', this.render);
  },

  events: {
    'click .nl-submit': "renderSearchQuery"
    // 'click li': 'renderModel'
  },

  render: function () {
    this.$el.html(this.template);
    return this;
  },

  renderSearchQuery: function () {
    console.log("You have a search query to implement");
    // collection form info
    // navigate to  search  
    //
  }
});
