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

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    render "comments/show"
  end

  def update
    @comment = Comment.find(params[:id])
    # if @comment.update_attributes(content: params[:content])
    if @comment.update_attributes(comment_params)
      render "comments/show"
    else
      render :json => @comment.errors, status: :unprocessable_enitity;
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:todo_id, :image_url, :content, :order_num)
  end
end