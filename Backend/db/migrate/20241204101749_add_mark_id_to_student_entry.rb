class AddMarkIdToStudentEntry < ActiveRecord::Migration[7.2]
  def change
    add_reference :student_entries, :mark, null: false, foreign_key: true
  end
end
