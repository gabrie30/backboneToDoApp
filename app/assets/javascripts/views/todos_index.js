window.Todo.Views.TodoIndex = Backbone.View.extend({

  // JST is a namespace, where all template functions will live
  template: JST["todos/index"],

  events: {
    "click button#refresh": "refresh",
    'click a[href="#/todos/new"]': ""
  },

  refresh: function(){
    this.collection.fetch();
  },

  initialize: function(options) {
    // "sync" is fired whenever fetch() is called on a collection
    // thats why we can get rid of the success callback in the refresh method
    this.listenTo(this.collection, "sync add", this.render.bind(this));

  },

  // Because we are using the keyword "collection" 
  // in our todo.js file we dont need
  // an initialize function here, another example is our className: "special-class"
  // model and collection are the two most widely used.

  // initialize: function(options) {
  //   this.collection = options.collection;
  // },

  render: function() {
    // Now have a template for producing this HTML
    var renderedContent = this.template({
      todos: this.collection
    });

    this.$el.html(renderedContent);
    return this;
  }
});