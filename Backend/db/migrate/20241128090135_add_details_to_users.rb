class AddDetailsToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :name, :string
    add_column :users, :first_lastName, :string
    add_column :users, :second_lastName, :string
  end
end
