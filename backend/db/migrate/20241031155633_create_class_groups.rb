class CreateClassGroups < ActiveRecord::Migration[7.2]
  def change
    create_table :class_groups do |t|
      t.integer :course
      t.string :module
      t.string :modality
      t.integer :number_students
      t.integer :max_students
      t.string :location
      t.integer :weekly_hours
      t.timestamps
    end
  end
end
