 Rails.application.routes.draw do
  root to: 'static_pages#root'

  resource :session, only: [:create, :destroy, :new]
  resources :users, only: [:new, :create, :show]
  resources :reviews, only: [:create, :destroy]
  resources :restaurants

  namespace :api, defaults: {:format => :json}  do
    resource :session, only: [:create, :destroy]
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


#
# form sends a  fetch
# this.searchResults._query = this.$(".query").val();
# this.searchResults.fetch({
#   data: {query: this.searchResults._query}
#   });
