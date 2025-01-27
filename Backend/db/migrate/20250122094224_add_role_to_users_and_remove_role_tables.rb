class AddRoleToUsersAndRemoveRoleTables < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :role, :string, default: "student"

    if table_exists?(:user_roles) && table_exists?(:roles)
      User.reset_column_information
      User.find_each do |user|
        user_role = UserRole.joins(:role).find_by(user_id: user.id)
        user.update_column(:role, user_role&.role&.name) if user_role.present?
      end
    end

    drop_table :user_roles if table_exists?(:user_roles)
    drop_table :roles if table_exists?(:roles)
  end
end
