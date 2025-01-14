class AddStudentEntryIdToStudentAnnotation < ActiveRecord::Migration[7.2]
  def change
    add_reference :student_annotations, :student_entry, null: false, foreign_key: true
  end
end
