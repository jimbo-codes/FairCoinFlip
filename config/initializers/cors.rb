Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins "http://localhost:3001/"
  
    #   Resource lets you set for different endpoints: ex: /games
      resource "*",
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head]
        # resource "/games",
        # headers: :any,
        # methods: [:get, :post, :put, :patch, :delete, :options, :head]
    end
  end