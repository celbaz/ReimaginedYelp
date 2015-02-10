YelpClone.Routers.Router = Backbone.Router.extend({
  initialize: function (options){
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'landingPage',
    'users/:id': 'userPage',
    'search': 'searchPage',
    'sentence': 'sentencePage'
  },

  landingPage: function () {
    var mainPageView = new YelpClone.Views.MainPageView({});
    this._swapView(mainPageView);
  },

  sentencePage: function () {
    var sentenceView = new YelpClone.Views.SentenceIndex();
    this._swapView(sentenceView);
  },

  userPage: function (id) {
    var user = new YelpClone.Models.User({id: id});
    user.fetch();
    var viewShow =  new YelpClone.Views.UserShow({
      model : user
    });
    this._swapView(viewShow);
  },

  searchPage: function () {
    var searchView = new YelpClone.Views.Search();
    this._swapView(searchView);
    this.map.createMap();
    this.map.locates();
  },


  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

  _requireSignedIn: function(callback){
    if (!BackboneAuthDemo.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.signIn(callback);
      return false;
    }

    return true;
  },

  _requireSignedOut: function(callback){
    if (BackboneAuthDemo.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }

    return true;
  },

  _goHome: function(){
    Backbone.history.navigate("", { trigger: true });
  },


});
