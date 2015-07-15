class AddOrderNumToComments < ActiveRecord::Migration
  def change
    add_column :comments, :order_num, :float

    Comment.find_each do |comment|
      comment.order_num = comment.id
      comment.save!
    end

    change_column :comments, :order_num, :float, :null => false
  end
end
