class AddUserAndVisibilityToStatements < ActiveRecord::Migration[7.2]
  def change
    add_reference :statements, :user, null: false, foreign_key: true
    add_column :statements, :is_public, :boolean, default: false
  end
end
