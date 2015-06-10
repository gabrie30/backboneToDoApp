class Api::TodosController < ApplicationController

  def index
    @todos = Todo.all 
    render "todos/index"
  end

  def create
    @todo = Todo.new(todo_params)
    if @todo.save()
      render :json => @todo
    else
      render :json => @todo.errors, status: :unprocessable_entity
    end
  end

  def update
    @todo = Todo.find(params[:id])
    if @todo.update_attributes(todo_params)
      render "todos/show"
    else
      render :json => @todo.errors, status: :unprocessable_entity
    end
  end

  def show
    @todo = Todo.find(params[:id])
    render "todos/show"
  end

  def destroy
    @todo = Todo.find(params[:id])
    if @todo.destroy
      render :json => @todo
    else
      raise "Error"
    end
  end

  protected

  def todo_params
    params.require(:todo).permit(:title)
  end

end