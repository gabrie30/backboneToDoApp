json.(todo, :id, :title, :todo_view_count, :created_at, :updated_at)

comments ||= nil

unless comments.nil?
  json.comments(comments) do |cmt|
    json.partial!("comments/comment", :comment => cmt)
  end
end