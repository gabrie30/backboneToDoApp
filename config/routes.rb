Rails.application.routes.draw do
  root :to => "site#root"
  namespace :api, :defaults => { :format => :json } do
    resources :todos, only: [:index, :create, :show] do
      resources :comments, only: [:index]
    end
    resources :comments, only: [:create, :show]
  end
end

