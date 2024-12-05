class AddCreatedByToTasks < ActiveRecord::Migration[7.2]
  def change
    add_column :tasks, :created_by, :integer
  end
end
