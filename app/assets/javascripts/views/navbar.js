YelpClone.Views.NavBar = Backbone.View.extend({
  initialize: function(options) {
    this.$navEl = options.$navEl;
    this.listenTo(YelpClone.currentUser, "change", this.render);
  },

  events: {
    "click modal-signin": "modalSignIn",
    "click modal-signup": "modalSignUp",
    "click sign-occurance": "submit"
  },

  render: function() {
    if (YelpClone.currentUser.isSignedIn()) {
      var content = JST['nav/logged_in'];
    } else {
      console.log("Hello");
      var content = JST['nav/logged_out'];
    }
    this.$navEl.html(content);
  },

  modalSignIn: function () {

  },

  modalSignUp: function () {

  }
});
