class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :todo_id, null: false
      t.text :content, null: false

      t.timestamps null: false
    end

    add_index :comments, :todo_id
  end
end
