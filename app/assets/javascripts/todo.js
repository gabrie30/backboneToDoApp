window.Todo = {
  Collections: {},
  Models: {},
  Views: {},
  Routers: {},

  //test
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


Backbone.CompositeView = Backbone.View.extend({

  addSubview: function(selector, subview) {
    var selectorSubviews =
      this.subviews()[selector] || (this.subviews()[selector] = []);

    selectorSubviews.push(subview);

    var $selectorEl = this.$(selector);
    $selectorEl.append(subview.$el);
  },

  removeSubview: function(selector, subview) {
    var selectorSubviews =
      this.subviews()[selector] || (this.subviews()[selector] = []);

    var subviewIndex = selectorSubviews.indexOf(subview);
    selectorSubviews.splice(subviewIndex, 1);
    subview.remove();
  },

  renderSubview: function() {
    // debugger
    var view = this;
    _(this.subviews()).each(function (selectorSubviews, selector) {
      var $selectorEl = view.$(selector);
      $selectorEl.empty();

      _(selectorSubviews).each(function (subview) {
        $selectorEl.append(subview.render().$el);
        subview.delegateEvents();
      });
    });
  },

  subviews: function() {
    if (!this._subviews) {
      this._subviews = {};
    }
    return this._subviews;
  }
});

$( function() {
  window.Todo.initialize();
});