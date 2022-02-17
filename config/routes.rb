Rails.application.routes.draw do
  # resources :results
  resources :games
  resources :fun_games, only: [:index, :update, :create]
  resources :users, only: [:index, :show, :create]


  #sessions/ login routes
  # post "/me/:wallet", to: "users#show"
  patch '/users/:wallet', to: 'users#update'
  get "/me/:wallet", to: "users#show"
  get "/leaders", to: "users#index"
end
