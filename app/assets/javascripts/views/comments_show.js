window.Todo.Views.CommentsShow = Backbone.CompositeView.extend({
  template: function() {
    return this.open ? JST["comments/edit"] : JST["comments/show"];
  },

  events: {
    "click button.destroy": "destroy",
    "dblclick div.content" : "beginEditing",
    "submit form.comment" : "endEditing"
  },

  initialize: function(options) {
    this.listenTo(this.model, "change", this.render);
    this.open = false;
  },

  beginEditing: function() {
    alert("STart edidting!!");
    this.open = true;
    this.render();
  },

  endEditing: function(event) {
    this.open = false;

    var content = this.$("textarea.comment_content").val();
    this.model.save({ content: content });
    this.render();
  },

  render: function () {
    var renderedContent = this.template()({
      comment: this.model
    });

    this.$el.html(renderedContent);
    this.renderSubview();

    return this;
  },

  destroy: function() {
    this.model.destroy();
  },
});