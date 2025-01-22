class AddRoleToUsersAndRemoveRoleTables < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :role, :string

    drop_table :user_roles
    drop_table :roles
  end
end
