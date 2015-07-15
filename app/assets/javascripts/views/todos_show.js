 window.Todo.Views.TodosShow = Backbone.CompositeView.extend({
  template: JST["todos/show"],

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.comments(), "add", this.addComment);
    this.listenTo(this.model.comments(), "remove", this.removeComment);

    var view = this;
    this.model.comments().each(function(comment){
      view.addComment(comment);
    });

    var commentNewView = new Todo.Views.CommentsNew({
      todo: this.model
    });

    this.addSubview(".comment-new", commentNewView);

  },


  removeComment: function(comment) {
    var commentsShowView =
      _(this.subviews()[".comments"]).find(function(subview) {
        return subview.model == comment;
      });

    this.removeSubview(".comment", commentsShowView);
  },

  addComment: function(comment) {
    var commentShowView = new Todo.Views.CommentsShow({
      model: comment
    });
    this.addSubview(".comments", commentShowView);
    commentShowView.render();
  },

  // events: {
  //   "click .special-class": "render"
  // },

  render: function() {

    var data = this.template({
      todo: this.model,
      // comments: this.model.comments()
    });

    this.$el.html(data);
    this.$(".comments").sortable({
      "update": function(event, ui) { ui.item.trigger("move");}
    });
    this.renderSubview();

    // Building more view objects inside render
    // this.model.comments().each(function (comment) {

    //   var commentsShowView = new Todo.Views.CommentsShow({
    //     model: comment
    //   });

    //   this.addSubview(".comments", commentsShowView);
    //   // this.$(".comments").append(commentsShowView.render().$el);
    // });

    // dont like rebuilding new view on every render
    // var commentNewView = new Todo.Views.CommentsNew({
    //   todo: this.model
    // });

    // this.addSubview(".comment-new", commentNewView);
    // this.$(".comment-new").html(commentNewView.render().$el);
    return this;
  },

});

// 1. Initiate model (todo) fetch
// 2. Initiate todo comments fetch
// 3. Renders TodosShow view <= no relevant data
// 4. Todo fetch completes; sync event fires on todo
// 5. TodosShow view re-renders in response to the sync
//       * has todo data but no comments data *
// 6. comments fetch completes; sync event fires on comments
// 7. TodosShow view re-renders in repose to the comments sync

