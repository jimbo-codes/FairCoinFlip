class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :wallet
      t.float :balance
      t.string :nickname
      t.float :funBal, :default => 10
      t.integer :funStreak, :default => 0
      t.integer :winStreak, :default => 0
      t.timestamps
    end
  end
end
