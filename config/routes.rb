Rails.application.routes.draw do
  resources :results
  resources :games
  resources :users
  # *** SET YOUR CORS (wherever that happens?) ***

  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
