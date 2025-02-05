class CreateTeacherClassGroup < ActiveRecord::Migration[7.2]
  def change
    create_table :teacher_class_groups do |t|
      t.references :user, null: false, foreign_key: true
      t.references :class_groups, null: false, foreign_key: true

      t.timestamps
    end
  end
end
