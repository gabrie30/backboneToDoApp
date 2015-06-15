window.Todo.Views.TodosShow = Backbone.CompositeView.extend({
  template: JST["todos/show"],

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.comments(), "sync add remove", this.render);

  var commentNewView = new Todo.Views.CommentsNew({
    todo: this.model
  });

  this.addSubview(".comment-new", commentNewView);
  },

  // events: {
  //   "click .special-class": "render"
  // },

  render: function() {

    var data = this.template({
      todo: this.model,
      // comments: this.comments
    });

    this.$el.html(data);
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

