class AddFinishedToExercises < ActiveRecord::Migration[7.2]
  def change
    add_column :exercises, :finished, :boolean, default: false, null: false
  end
end
