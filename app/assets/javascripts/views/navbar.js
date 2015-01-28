YelpClone.Views.NavBar = Backbone.View.extend({
  initialize: function(options) {
    this.listenTo(YelpClone.currentUser, "change", this.render);
  },

  events: {
    "click .modal-signin": "modalSignIn",
    "click .modal-signup": "modalSignUp",
    "submit #sign-up": "createNewUser",
    "submit #sign-in": "signInUser",
    "click .sign-out": "signOut"
  },

  render: function() {
    if (YelpClone.currentUser.isSignedIn()) {
      var content = JST['nav/logged_in']();
    } else {
      var content = JST['nav/logged_out']();
    }
    this.$el.html(content);
  },

  modalSignIn: function () {
    var content = JST['nav/modal-sign-in']();
    $("#modal").html(content);
  },

  modalSignUp: function () {
    var content = JST['nav/modal-sign-up']();
    $("#modal").html(content);
  },

  createNewUser: function(event){
    event.preventDefault();
    var $form = $("form");
    var userData = $form.serializeJSON().user;
    var that = this;

    var newUser = new YelpClone.Models.User(userData);
    newUser.save({}, {
      success: function(){
        console.log("Hello")
        YelpClone.currentUser.signIn(userData);
        YelpClone.currentUser.fetch();
        // that.collection.add(that.model, { merge: true });
        Backbone.history.navigate("" , { trigger: true });
      },
      error: function(model, data){
        alert("Form invalid. Let the user know what went wrong.");
        console.log(data);
      }
    });
  },

  signInUser: function (event) {
    event.preventDefault();

    var $form = $("form");
    var userData = $form.serializeJSON().user;
    var that = this;
    console.log(userData);
    YelpClone.currentUser.signIn({
      username: userData.username,
      password: userData.password,
      error: function(){
        alert("Wrong username/password combination. Please try again.");
      }
    });
  },

  signOut: function (event) {
    console.log("sign-out");
    YelpClone.currentUser.signOut();
  }
});
