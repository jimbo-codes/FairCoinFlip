class User < ApplicationRecord
    has_many :games
    has_one :result, through: :game
end
