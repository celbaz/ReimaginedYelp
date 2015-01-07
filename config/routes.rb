Rails.application.routes.draw do
  resource :session, only: [:create, :destroy, :new]
  resources :users, only: [:new, :create, :show]
end
