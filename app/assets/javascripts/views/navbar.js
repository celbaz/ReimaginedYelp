YelpClone.Views.NavBar = Backbone.View.extend({
  initialize: function(options) {
    this.listenTo(YelpClone.currentUser, "change", this.render);
  },

  events: {
    "click .modal-signin": "modalSignIn",
    "click .modal-signup": "modalSignUp",
    "submit #sign-up": "createNewUser",
    "click .guest-account": "createGuestAccount",
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
    var newUser = new YelpClone.Models.User(userData);

    newUser.save({}, {
      success: function(){
        YelpClone.currentUser.signIn(newUser);
        YelpClone.currentUser.fetch({
          success: function () {
            Backbone.history.navigate("#/users/" + YelpClone.currentUser.id , { trigger: true });
          }
        });
      },
      error: function(model, data){
        alert(data.responseText);
      }
    });
  },

  createGuestAccount: function () {
    var text = "guest";
    var possible = "abcdefghijklmnopqrstuvwxyz0123";

    for (var i = 0; i < 6; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    text += "@demo.com"
    var userData = {username: text, password: "guestlogin",
                    nickname: "Guest User", description: "Thanks for stopping by!"};

    var newUser = new YelpClone.Models.User(userData);
    console.log(newUser)
    newUser.save({}, {
      success: function() {
        alert("Welcome to the Guest Tour!" +
          " Your password is: " + userData.password +
          ". Your useremail is: " + userData.username + "."
        );
        // var restaurantData = {username: text, password: "guestlogin",
        //                 nickname: "Guest User", description: "Thanks for stopping by!"};

        // create restaurant and add reviews 1 from user and the other from user 1
        // var newPlace = new YelpClone.Models.Restaurant(restaurantData);



        YelpClone.currentUser.signIn(newUser);
        YelpClone.currentUser.fetch({
          success: function () {
            Backbone.history.navigate("#/users/" + YelpClone.currentUser.id , { trigger: true });
          },
          error: function () {
            alert("Randomly Generated User already exists");
          }

        });
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
