YelpClone.Views.Search = Backbone.CompositeView.extend({

  className: "group",
  template: JST['search/container'],

  renderTemplate: JST['search/results'],
  listTemplate  : JST['search/list'],

  render: function () {
    var renderedContent = this.template();
    // console.log("hello")
    this.$el.html(renderedContent);
    var sidesearch = new YelpClone.Views.SearchForm();
    var mapview = new YelpClone.Views.Map({el: this.$("#map-show")});
    this.addSubview('#map-show', mapview);
    this.addSubview('#sidebar-info', sidesearch);
    YelpClone.router.$rootEl.addClass("maps");
    return this;
  },

  remove: function () {
    YelpClone.router.$rootEl.removeClass("maps");
    Backbone.CompositeView.prototype.remove.call(this);
  }

});
