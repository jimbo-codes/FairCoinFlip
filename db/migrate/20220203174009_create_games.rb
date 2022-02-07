class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.boolean :call
      # false = heads, true = tails.
      t.float :wagerAmount
      t.float :wagerResult
      t.boolean :flipResult
      t.boolean :userWin
      t.integer :userStreak
      t.integer :user_id
      t.timestamps
    end
  end
end
