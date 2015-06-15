window.Todo.Views.CommentsNew = Backbone.View.extend({
  template: JST["comments/new"],

  events: {
    "submit form": "submit",
    "keyup textarea": "handleKeyUp"
  },

  handleKeyUp: function(event) {
    this.renderPreview();
  },

  renderPreview: function() {
    var content = this.$("textarea").val();
    var previewContent = marked(_.escape(content));
    this.$(".preview").html(previewContent);
  },

  initialize: function(options) {
    this.todo = options.todo;
  },

  submit: function(event) {
    event.preventDefault();
    var view = this;

    var params = $(event.currentTarget).serializeJSON()["comment"];


    var newComment = new Todo.Models.Comment(params);

    newComment.save({},{
      success: function(){
        view.todo.comments().add(newComment);
      }
    });
  },

  render: function() {
    var renderedContent = this.template({
      todo: this.todo
    });

    this.$el.html(renderedContent);

    return this;
  },

});