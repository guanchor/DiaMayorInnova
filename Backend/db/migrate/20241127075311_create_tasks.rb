class CreateTasks < ActiveRecord::Migration[7.2]
  def change
    create_table :tasks do |t|
      t.string :title
      t.date :opening_date
      t.datetime :closing_date
      t.timestamps
    end
  end
end
