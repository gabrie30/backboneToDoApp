window.Todo.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "todosIndex",
    "todos/new": "todosNew",
    "todos/:id": "todosShow"
  },

  todosIndex: function(){
    var indexView = new Todo.Views.TodoIndex({
      collection: Todo.Collections.todos,
      // className: "special-class"
    });

    Todo.Collections.todos.fetch();
    this._swapView(indexView);

  },

  todosNew: function(){
    var newView = new Todo.Views.TodosNew();
    this._swapView(newView);

  },

  todosShow: function(id) {
    var model = Todo.Collections.todos.getOrFetch(id);
    
    // we now do this in the api
    // model.comments().fetch();

    var showView = new Todo.Views.TodosShow({
      model: model
    });
    this._swapView(showView);
  },

  _swapView: function(view) {
    if(this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;

    $("body").html(view.render().$el);
  }
});