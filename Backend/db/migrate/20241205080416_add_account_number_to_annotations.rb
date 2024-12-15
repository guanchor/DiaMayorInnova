class AddAccountNumberToAnnotations < ActiveRecord::Migration[7.2]
  def change
    add_column :annotations, :account_number, :integer
  end
end
