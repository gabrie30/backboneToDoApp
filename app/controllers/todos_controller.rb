# class Api::TodosController < ApplicationController

#   def index
#     @todos = Todo.all 
#     render :json => @todos
#   end

#   def create
#     @todo = Todo.new(todo_params)
#     if @todo.save()
#       render :json => @todo
#     else
#       render :json => @todo.errors, status: :unprocessable_entity
#     end
#   end

#   def show
#     @todo = Todo.find(params[:id])
#     render :json => @todo
#   end

#   protected

#   def todo_params
#     params.permit(:todo).require(:title)
#   end

# end
