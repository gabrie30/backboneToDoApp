window.Todo.Collections.Comments = Backbone.Collection.extend({
  model: Todo.Models.Comment,

  url: function() {
    // return "/api/todos/" + this.todo.get("id") + "/comments";
    return this.todo.url() + "/comments";
  },

  initialize: function(models, options) {
    this.todo = options.todo;
  },

});

// var todo = Todo.Models.Todo({ id: 3});
// var todoComments = new Todo.Collections.Comments([], {
//   todo: todo
// })