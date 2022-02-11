class CreateFunGames < ActiveRecord::Migration[7.0]
  def change
    create_table :fun_games do |t|
      t.boolean :call
      t.float :wagerAmount
      t.float :wagerResult
      t.boolean :flipResult
      t.boolean :funUserWin
      t.integer :funUserStreak
      t.integer :user_id
      t.timestamps
    end
  end
end
