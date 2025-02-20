class AddClassGroupsRefToUsers < ActiveRecord::Migration[7.2]
  def change
    add_reference :users, :class_groups, null: true, foreign_key: true
  end
end
