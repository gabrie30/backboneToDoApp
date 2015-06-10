window.Todo = {
  Collections: {},
  Models: {},
  Views: {},
  Routers: {},


  initialize: function() {
    // Moved to app router
    // var indexView = new Todo.Views.TodoIndex({
    //   collection: Todo.Collections.todos,
    //   className: "special-class"
    // });

    // Todo.Collections.todos.fetch();
    // $("body").append(indexView.render().$el);
    
    // fetch is an ajax request that will not wait, so if we call render
    // outside of this function, it will render the view before the ajax
    // has finished, resulting in no text being shown.
    // Todo.Collections.todos.fetch({
    //   success: function() {
    //     // view.render(); // render returns self, so we can chiain it
    //     $("body").append(view.render().$el);
    //   }
    // });

    // var newView = new Todo.Views.TodosNew();
    // $("body").append(newView.render().$el);

    // just sets up the routes
    new Todo.Routers.AppRouter();
    // start listining to changes to the location
    Backbone.history.start();
  }

};

$( function() {
  window.Todo.initialize();
});