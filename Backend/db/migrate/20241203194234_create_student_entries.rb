class CreateStudentEntries < ActiveRecord::Migration[7.2]
  def change
    create_table :student_entries do |t|
      t.integer :entry_number
      t.date :entry_date

      t.timestamps
    end
  end
end
