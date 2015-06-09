class Api::CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)
    if @comment.save()
      render :json => @comment
    else
      render :json => @comment.errors, status: :unprocessable_enitity
    end
  end

  def show
    @comment = Comment.where(todo_id: params[:todo_id])
    render :json => @comment
  end

  def index
    @comments = Comment.where(todo_id: params[:todo_id])
    render :json => @comments
  end

  private

  def comment_params
    params.require(:comment).permit(:todo_id, :content)
  end
end