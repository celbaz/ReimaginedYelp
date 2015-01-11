YelpClone.Views.Search = Backbone.View.extend({
  // currentSearchGPS: function (lat,long) {
  //   if(GPS){
  //
  //   }
  // },
  //
  // GPS: [],
  initialize: function () {
    // this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['search/index'],

  render: function () {
    var renderedContent = this.template();
    console.log("hello");
    this.$el.html(renderedContent);
    return this;
  }

});
