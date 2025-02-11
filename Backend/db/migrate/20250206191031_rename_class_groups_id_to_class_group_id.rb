class RenameClassGroupsIdToClassGroupId < ActiveRecord::Migration[7.2]
  def change
    rename_column :teacher_class_groups, :class_groups_id, :class_group_id
  end
end
