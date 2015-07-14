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

  remove: function() {
    Backbone.View.prototype.remove.call(this);

    // removes all subviews
    _(this.subviews()).each(function(selectorSubviews, selector) {
      _(selectorSubviews).each(function(subview){
        subview.remove();
      });
    });
  },

  removeSubview: function(selector, subview) {
    var selectorSubviews =
      this.subviews()[selector] || (this.subviews()[selector] = []);

    var subviewIndex = selectorSubviews.indexOf(subview);
    selectorSubviews.splice(subviewIndex, 1);
    subview.remove();
  },

  renderSubview: function() {
    
    var view = this;
    _(this.subviews()).each(function (selectorSubviews, selector) {
      var $selectorEl = view.$(selector);
      $selectorEl.empty();

      _(selectorSubviews).each(function (subview) {
        $selectorEl.append(subview.render().$el);
        // this._subviews.add(subview);
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


// We want to have one subview per row.
Backbone.TableView = Backbone.CompositeView.extend({
  rowSubviewClass: null,

  events: {
    "click th" : "resort"
  },

  initialize: function() {
    this.sortFn = null;
    this.listenTo(this.collection, "add", this.addRowSubview);

    this.collection.each(function(subView){
      this.addRowSubview(subView);
    }.bind(this));
  },

  addRowSubview: function(model) {
    
    var rowSubview = new this.rowSubviewClass({
      model: model
    });

    this.addSubview("tbody", rowSubview);
    rowSubview.render();
  },

  resort: function(event) {
    // this.sortFn = this._sortColFn(
    //   $(event.currentTarget).data("col")
    // ); // this is same as below

    var $currentTarget = $(event.currentTarget);
    if ($currentTarget.data("sort-col")) {
      this.sortFn = this._sortColFn($currentTarget.data("sort-col"));
    } else {
      // this is going to find the method _lowerTitle
      this.sortFn = this[$currentTarget.data("sort-fn")];
    }

    this._sortRowSubviews();
    this.renderSubview();
  },

  _sortRowSubviews: function() {
    var tableView = this;

    var rowSubviews = this.subviews()['tbody'];

    rowSubviews.sort( function( rowView1, rowView2) {
      var val1 = tableView.sortFn(rowView1.model);
      var val2 = tableView.sortFn(rowView2.model);

      if (val1 < val2) {
        return -1;
      } else if ( val1 == val2 ) {
        return 0;
      } else {
        return 1;
      }
    });
  },

  _sortColFn: function(col) {
    return function(model) {
      return model.get(col);
    };
  }

});

$( function() {
  window.Todo.initialize();
});