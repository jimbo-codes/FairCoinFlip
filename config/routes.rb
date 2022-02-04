Rails.application.routes.draw do
  resources :results
  resources :games
  resources :users, only: [:index]

  #sessions/ login routes
  # post "/me/:wallet", to: "users#show"
  get "/me/:wallet", to: "users#show"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
