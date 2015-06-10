window.Todo.Views.TodosShow = Backbone.View.extend({
  template: JST["todos/show"],

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.comments(), "sync", this.render);
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
    return this;
  }

});

// 1. Initiate model (todo) fetch
// 2. Initiate todo comments fetch
// 3. Renders TodosShow view <= no relevant data
// 4. Todo fetch completes; sync event fires on todo
// 5. TodosShow view re-renders in response to the sync
//       * has todo data but no comments data *
// 6. comments fetch completes; sync event fires on comments
// 7. TodosShow view re-renders in repose to the comments sync

