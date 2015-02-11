YelpClone.Views.UserProfile = Backbone.View.extend({

  template: JST['users/profile'],
  editTemplate: JST['users/edituser'],

  events: {
    'click .edit-user': 'editUser',
    'click .save-user': 'saveUser',
    "change #input-post-image": "fileInputChange",
  },

  initialize: function (options){
    this.model = options.user;
  },

  render: function () {
    var renderedContent = this.template({
        user : this.model
    });
    this.$el.html(renderedContent);
    return this;
  },

  saveUser: function(event) {
    console.log(this.model);
    event.preventDefault();
    var formData = $(".user-content").serializeJSON().user, that = this;
    this.model.set(formData);
    console.log(this.model);
    this.model.save({}, {
      success: function () {
       delete that.model._picture;
        Backbone.history.navigate("#/users/" + YelpClone.currentUser.id, {trigger: true});
      }
    });
  },

  editUser: function (event) {
    var renderedContent = this.editTemplate({
      user: this.model
    });
    this.$el.html(renderedContent);
  },

  fileInputChange: function(event){

    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that._updatePreview(reader.result);
      that.model._image = reader.result;

      console.log(that.model);
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this._updatePreview("");
      delete this.model._image;

      console.log(this.model);
    }
  },

  _updatePreview: function(src){
    this.$el.find("#preview-post-image").attr("src", src);
  }

});
