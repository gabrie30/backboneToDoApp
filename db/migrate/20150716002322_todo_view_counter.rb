class TodoViewCounter < ActiveRecord::Migration
  def change
    add_column :todos, :todo_view_count, :integer, :default => 0
  end
end
