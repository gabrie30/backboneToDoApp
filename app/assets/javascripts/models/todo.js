window.Todo.Models.Todo = Backbone.Model.extend({
  urlRoot: "/api/todos",

  comments: function(){

    //build this collection once, then reuse it over and over
    if (!this._comments) {
      this._comments = new Todo.Collections.TodoComments([], {
        todo: this
      });
    }

    return this._comments;
  },

  parse: function(jsonResp) {
    if (jsonResp.comments) {
      this.comments().set(jsonResp.comments);
      delete jsonResp.comments;
    }

    return jsonResp;
  }
});

// Making associations in Backbone
// Build a collection if necessary