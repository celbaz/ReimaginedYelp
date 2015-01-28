 Rails.application.routes.draw do
  root to: 'static_pages#root'
  resource :session, only: [:create, :destroy, :new]

  namespace :api, defaults: {:format => :json}  do
    resource :session, only: [:create, :destroy, :show]
    resources :users
    resources :reviews, only: [:create, :destroy, :update, :show]
    resources :restaurants, only: [:create, :destroy, :update, :show, :index] do
      collection do
        get "search"
        get "location"
      end
    end
  end
end
