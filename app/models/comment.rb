class Comment < ActiveRecord::Base
  before_validation :ensure_order_num, on: :create

  validates :content, :order_num, :todo, presence: true

  belongs_to :todo

  default_scope { order(:order_num) }

  private

    def ensure_order_num
      return unless self.order_num.nil?

      max_order_num = Comment
        .where(:todo_id => self.todo_id)
        .maximum(:order_num) || 0

      self.order_num = max_order_num + 1 
    end
end
