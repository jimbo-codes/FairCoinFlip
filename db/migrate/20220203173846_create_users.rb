class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :wallet
      t.float :balance
      t.integer :winStreak, :default => 0
      # If this doesnt work create a second migration to set default
      #   def change
      #     change_column :widgets, :colour, :string, default: 'red'
      # end
      t.timestamps
    end
  end
end
