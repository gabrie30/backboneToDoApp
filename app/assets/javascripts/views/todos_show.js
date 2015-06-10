window.Todo.Views.TodosShow = Backbone.View.extend({
  template: JST["todos/show"],

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