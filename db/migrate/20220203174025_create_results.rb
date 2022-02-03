class CreateResults < ActiveRecord::Migration[7.0]
  def change
    create_table :results do |t|
      t.float :wagerResult
      t.boolean :flipResult
      t.boolean :win
      t.integer :game_id
      t.timestamps
      # Make sure these timestamps can let you sort by time periods.
    end
  end
end
