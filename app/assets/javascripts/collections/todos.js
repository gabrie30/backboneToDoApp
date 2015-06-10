window.Todo.Collections.Todos = Backbone.Collection.extend({
  url: "/api/todos",
  model: Todo.Models.Todo,

  getOrFetch: function(id) {
    var model;
    if (model = this.get(id)) {
      return model;
    } else {
      mdoel = new Todo.Models.Todo({ id: id });
      model.fetch();
      return model;
    }
  }
});

window.Todo.Collections.todos = new Todo.Collections.Todos();
