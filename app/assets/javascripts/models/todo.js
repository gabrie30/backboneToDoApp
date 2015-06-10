window.Todo.Models.Todo = Backbone.Model.extend({
  urlRoot: "/api/todos",

  comments: function(){

    //build this collection once, then reuse it over and over
    if (!this._comments) {
      this._comments = new Todo.Collections.Comments([], {
        todo: this
      });
    }

    return this._comments;
  }
});

// Making associations in Backbone
// Build a collection if necessary