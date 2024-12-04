class CreateStudentAnnotations < ActiveRecord::Migration[7.2]
  def change
    create_table :student_annotations do |t|
      t.references :account, null: false, foreign_key: true

      t.timestamps
    end
  end
end
