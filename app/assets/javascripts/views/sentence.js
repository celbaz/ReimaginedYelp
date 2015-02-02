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

  renderSearchQuery: function (event) {
    event.preventDefault();
    var query = $('#nl-form');
    var result = $('#nl-form').serializeJSON().search;
    console.log(result);

  }
});
