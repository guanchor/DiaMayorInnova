class CreateTaskStatement < ActiveRecord::Migration[7.2]
  def change
    create_table :task_statements do |t|
      t.references :task, null: false, foreign_key: true
      t.references :statement, null: false, foreign_key: true

      t.timestamps
    end
  end
end
