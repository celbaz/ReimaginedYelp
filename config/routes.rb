Rails.application.routes.draw do
  root to: 'static_pages#root'

  resource :session, only: [:create, :destroy, :new]
  resources :users, only: [:new, :create, :show]
  resources :reviews, only: [:create, :destroy]
  resources :restaurants

  namespace :api, defaults: {:format => :json}  do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :show]
    resources :reviews, only: [:create, :destroy, :update, :show]
    resources :restaurants, only: [:create, :destroy, :update, :show, :index]
  end
end
