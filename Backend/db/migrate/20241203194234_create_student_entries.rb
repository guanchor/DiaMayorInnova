class CreateStudentEntries < ActiveRecord::Migration[7.2]
  def change
    create_table :student_entries do |t|
      t.integer :EntryNumber
      t.date :EntryDate

      t.timestamps
    end
  end
end
