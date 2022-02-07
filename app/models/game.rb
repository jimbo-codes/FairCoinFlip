class Game < ApplicationRecord
    belongs_to :user
    # has_one :result

    # def user
    #     user = User.find_by_id(self.user_id)
    #    return user.wallet
    # end
end
