class AddStartedToExercises < ActiveRecord::Migration[7.2]
  def change
    add_column :exercises, :started, :boolean, default: false, null: false
  end
end
