class AddExerciseIdToMark < ActiveRecord::Migration[7.2]
  def change
    add_reference :marks, :exercise, null: false, foreign_key: true
  end
end
