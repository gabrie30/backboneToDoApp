class Todo < ActiveRecord::Base
  validates :title, :todo_view_count, presence: true

  has_many :comments

end
