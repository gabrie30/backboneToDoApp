class Api::CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)
    if @comment.save()
      render "comments/show"
    else
      render :json => @comment.errors, status: :unprocessable_enitity
    end
  end

  def show
    @comment = Comment.where(todo_id: params[:todo_id])
    render "comments/show"
  end

  def index
    @comments = Comment.where(todo_id: params[:todo_id])
    render "comments/index"
  end

  private

  def comment_params
    params.require(:comment).permit(:todo_id, :content)
  end
end