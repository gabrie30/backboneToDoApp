window.Todo.Views.TodosIndexRow = Backbone.View.extend({
  tagName: "tr",
  template: JST["todos/index_row"],

  render: function() {
    var renderedContent = this.template({ todo: this.model });

    this.$el.html(renderedContent);

    return this;
  }
});


window.Todo.Views.TodoIndex = Backbone.TableView.extend({

  rowSubviewClass: Todo.Views.TodosIndexRow,

  // JST is a namespace, where all template functions will live
  template: JST["todos/index"],

  events: _.extend({
    "click button#refresh": "refresh",
    'click a[href="#/todos/new"]': ""
  }, Backbone.TableView.prototype.events),

  refresh: function(){
    this.collection.fetch();
  },

  // Even initializing this class will cause the todosubviews not to render
  // initialize: function(options) {
  //   // "sync" is fired whenever fetch() is called on a collection
  //   // thats why we can get rid of the success callback in the refresh method
  //   // this.listenTo(this.collection, "sync add", this.render.bind(this));

  // },

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
    this.renderSubview();
    return this;
  },

  _lowerTitle: function(model) {
    return model.get("title").toLowerCase();
  }
});